// Cloudflare Pages Function: POST /api/chat — answers the chat widget with Claude.
// Needs the ANTHROPIC_API_KEY environment variable (set in the Cloudflare dashboard).
// Without it the widget falls back to its built-in answers.
import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE } from "../../cloudflare/knowledge.js";
import { MAX_MESSAGE_CHARS, REFUSAL_TEXT, ERROR_MARKER, buildSystemPrompt, buildMessages, chatRequest, makeLimiter } from "../../server/shared.mjs";

const SYSTEM_PROMPT = buildSystemPrompt(KNOWLEDGE);
const limited = makeLimiter(30, 10 * 60 * 1000); // per visitor, per running instance

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return json(503, { error: "Chat AI is not configured." });
  if (limited(request.headers.get("CF-Connecting-IP") || "unknown")) return json(429, { error: "Too many messages. Please wait a few minutes." });

  let body;
  try { body = await request.json(); } catch { return json(400, { error: "Invalid request." }); }
  const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_CHARS);
  if (!message) return json(400, { error: "Empty message." });

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const messages = buildMessages(body.history, message, typeof body.page === "string" ? body.page : "");
  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  // Stream Claude's reply to the browser as it is written.
  (async () => {
    try {
      const stream = client.beta.messages.stream(
        chatRequest({ model: env.CHAT_MODEL, systemPrompt: SYSTEM_PROMPT, messages }),
        { signal: request.signal },
      );
      stream.on("text", (delta) => { writer.write(encoder.encode(delta)).catch(() => {}); });
      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal") await writer.write(encoder.encode(REFUSAL_TEXT));
    } catch (err) {
      if (err instanceof Anthropic.AuthenticationError) console.error("[chat] invalid API key");
      else if (err instanceof Anthropic.RateLimitError) console.error("[chat] rate limited by the API");
      else if (err instanceof Anthropic.APIError) console.error(`[chat] API error ${err.status}: ${err.message}`);
      else console.error("[chat]", err && err.message);
      await writer.write(encoder.encode(ERROR_MARKER)).catch(() => {});
    } finally {
      await writer.close().catch(() => {});
    }
  })();

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
