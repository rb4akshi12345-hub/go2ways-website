// go2ways website server: serves the static site, answers the chat widget with Claude,
// and receives the contact form (see contact.mjs).
//
//   cd go2ways-website/server && npm install && npm start
//
// Needs ANTHROPIC_API_KEY (put it in server/.env, see .env.example). Without a key the
// site still works and the chat widget falls back to its built-in answers.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { handleContact, handleAdmin, contactStatus } from "./contact.mjs";
import { MODEL_DEFAULT, MAX_MESSAGE_CHARS, REFUSAL_TEXT, ERROR_MARKER, buildSystemPrompt, buildMessages, chatRequest, makeLimiter } from "./shared.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(here, "..");
const PORT = Number(process.env.PORT) || 5179;
const MODEL = process.env.CHAT_MODEL || MODEL_DEFAULT;

const KNOWLEDGE = fs.readFileSync(path.join(here, "knowledge.md"), "utf8");
const SYSTEM_PROMPT = buildSystemPrompt(KNOWLEDGE);

const hasCredentials = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const client = hasCredentials ? new Anthropic() : null;

// ------------------------------------------------------------------ limits
const MAX_BODY_BYTES = 32 * 1024;
const rateLimited = makeLimiter(30, 10 * 60 * 1000); // chat requests per IP per 10 minutes

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY_BYTES) { reject(new Error("too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8"))); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

async function handleChat(req, res) {
  if (!client) return sendJson(res, 503, { error: "Chat AI is not configured (no ANTHROPIC_API_KEY)." });
  const ip = req.socket.remoteAddress || "unknown";
  if (rateLimited(ip)) return sendJson(res, 429, { error: "Too many messages. Please wait a few minutes." });

  let body;
  try { body = await readJson(req); } catch { return sendJson(res, 400, { error: "Invalid request." }); }
  const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_CHARS);
  if (!message) return sendJson(res, 400, { error: "Empty message." });

  const messages = buildMessages(body.history, message, typeof body.page === "string" ? body.page : "");

  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" });
  const controller = new AbortController();
  res.on("close", () => { if (!res.writableEnded) controller.abort(); });

  try {
    const stream = client.beta.messages.stream(
      chatRequest({ model: MODEL, systemPrompt: SYSTEM_PROMPT, messages }),
      { signal: controller.signal },
    );
    stream.on("text", (delta) => res.write(delta));
    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal") {
      res.write(REFUSAL_TEXT);
    }
    res.end();
  } catch (err) {
    if (controller.signal.aborted) return;
    if (err instanceof Anthropic.AuthenticationError) console.error("[chat] invalid API key");
    else if (err instanceof Anthropic.RateLimitError) console.error("[chat] rate limited by the API");
    else if (err instanceof Anthropic.APIError) console.error(`[chat] API error ${err.status}: ${err.message}`);
    else console.error("[chat]", err);
    // Headers are already sent; the widget treats this marker as a failure and falls back.
    res.end(ERROR_MARKER);
  }
}

// ------------------------------------------------------------------ static files
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2",
};
const BLOCKED = new Set(["server", "_build", "node_modules", "functions", "cloudflare", "google-sheets", "dist", "package.json", "package-lock.json"]);

function serveStatic(req, res) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { res.writeHead(400); return res.end(); }
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = path.resolve(SITE_ROOT, "." + pathname);
  const first = path.relative(SITE_ROOT, file).split(path.sep)[0];
  if (!file.startsWith(SITE_ROOT + path.sep) || BLOCKED.has(first) || path.basename(file).startsWith(".") || file.endsWith(".md")) {
    res.writeHead(404); return res.end("Not found");
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      const page404 = path.join(SITE_ROOT, "404.html");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return fs.existsSync(page404) ? fs.createReadStream(page404).pipe(res) : res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Content-Length": st.size });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).pipe(res);
  });
}

http.createServer((req, res) => {
  const route = req.url.split("?")[0];
  if (route === "/api/chat" || route === "/api/contact") {
    if (req.method !== "POST") { res.writeHead(405, { Allow: "POST" }); return res.end(); }
    return route === "/api/chat" ? handleChat(req, res) : handleContact(req, res);
  }
  if (route === "/api/health") {
    return sendJson(res, 200, { ok: true, chatAI: Boolean(client), email: contactStatus.email.startsWith("on"), inbox: contactStatus.inbox.startsWith("on") });
  }
  if (route === "/admin" || route === "/admin/" || route === "/admin/messages.csv") return handleAdmin(req, res);
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }
  serveStatic(req, res);
}).listen(PORT, process.env.HOST || "127.0.0.1", () => {
  console.log(`go2ways site on http://localhost:${PORT}`);
  console.log(client ? `chat AI: on (${MODEL})` : "chat AI: off - add ANTHROPIC_API_KEY to server/.env to turn it on");
  console.log(`contact form: saving to ${path.relative(SITE_ROOT, contactStatus.store)}`);
  console.log(`email alerts: ${contactStatus.email}`);
  console.log(`inbox: ${contactStatus.inbox}`);
});
