// Cloudflare Pages Function: POST /api/contact — checks a contact form message and
// saves it to your Google Sheet (which also emails you). See google-sheets/Code.gs.
// Needs SHEETS_WEBHOOK_URL and SHEETS_SECRET environment variables in Cloudflare.
import { cleanContact, validateContact, makeLimiter } from "../../server/shared.mjs";

const limited = makeLimiter(5, 10 * 60 * 1000); // per visitor, per running instance
const FALLBACK = "Could not send your message. Please email support@go2ways.com.";

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

export async function onRequestPost({ request, env }) {
  if (limited(request.headers.get("CF-Connecting-IP") || "unknown")) {
    return json(429, { error: "Too many messages. Please try again in a few minutes." });
  }

  let body;
  try { body = await request.json(); } catch { return json(400, { error: "Invalid request." }); }

  // Honeypot: real visitors never fill the hidden "website" field; bots usually do.
  if (body.website) return json(200, { ok: true });

  const d = cleanContact(body);
  const errors = validateContact(d);
  if (Object.keys(errors).length) return json(422, { error: "Please check the highlighted fields.", errors });

  if (!env.SHEETS_WEBHOOK_URL || !env.SHEETS_SECRET) {
    console.error("[contact] SHEETS_WEBHOOK_URL / SHEETS_SECRET not set");
    return json(503, { error: FALLBACK });
  }

  try {
    // Apps Script answers through a redirect; text/plain keeps it a simple request.
    const r = await fetch(env.SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: env.SHEETS_SECRET, message: d }),
      redirect: "follow",
    });
    const out = await r.json().catch(() => null);
    if (!out || !out.ok) {
      console.error("[contact] Google Sheet rejected the message:", out && out.error, r.status);
      return json(502, { error: FALLBACK });
    }
  } catch (err) {
    console.error("[contact] could not reach the Google Sheet:", err && err.message);
    return json(502, { error: FALLBACK });
  }
  return json(200, { ok: true });
}
