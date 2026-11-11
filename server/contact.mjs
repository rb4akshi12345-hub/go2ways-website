// Contact form backend: validates and saves messages, emails the team (when SMTP is set up),
// and serves a password-protected inbox at /admin.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import { cleanContact, validateContact, makeLimiter } from "./shared.mjs";

const env = process.env;
const DATA_DIR = path.resolve(env.DATA_DIR || path.join(path.dirname(fileURLToPath(import.meta.url)), "data"));
const STORE = path.join(DATA_DIR, "messages.jsonl");
fs.mkdirSync(DATA_DIR, { recursive: true });

// ------------------------------------------------------------------ email (optional)
const mailer = env.SMTP_HOST && env.NOTIFY_TO
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: Number(env.SMTP_PORT) === 465,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  : null;

export const contactStatus = {
  email: mailer ? `on (to ${env.NOTIFY_TO})` : "off - set SMTP_* and NOTIFY_TO in server/.env",
  inbox: env.ADMIN_PASSWORD ? "on at /admin" : "off - set ADMIN_PASSWORD in server/.env",
  store: STORE,
};

// ------------------------------------------------------------------ helpers
const MAX_BODY = 16 * 1024;
const limited = makeLimiter(5, 10 * 60 * 1000); // form messages per IP per 10 minutes

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", (c) => { size += c.length; if (size > MAX_BODY) { reject(new Error("too large")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8"))); } catch (e) { reject(e); } });
    req.on("error", reject);
  });
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ------------------------------------------------------------------ POST /api/contact
export async function handleContact(req, res) {
  const ip = req.socket.remoteAddress || "unknown";
  if (limited(ip)) return json(res, 429, { error: "Too many messages. Please try again in a few minutes." });

  let body;
  try { body = await readJson(req); } catch { return json(res, 400, { error: "Invalid request." }); }

  // Honeypot: real visitors never see or fill the "website" field; bots usually do.
  if (body.website) return json(res, 200, { ok: true });

  const d = cleanContact(body);
  const errors = validateContact(d);
  if (Object.keys(errors).length) return json(res, 422, { error: "Please check the highlighted fields.", errors });

  const entry = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...d };
  try {
    fs.appendFileSync(STORE, JSON.stringify(entry) + "\n");
  } catch (err) {
    console.error("[contact] could not save message:", err.message);
    return json(res, 500, { error: "Could not send your message. Please email support@go2ways.com." });
  }
  console.log(`[contact] new message from ${d.name} <${d.email}>`);
  json(res, 200, { ok: true });

  // Email the team after replying, so a slow mail server never delays the visitor.
  if (mailer) {
    mailer.sendMail({
      from: env.NOTIFY_FROM || env.SMTP_USER,
      to: env.NOTIFY_TO,
      replyTo: `${d.name} <${d.email}>`,
      subject: `New website enquiry from ${d.name}${d.company ? ` (${d.company})` : ""}`,
      text: [
        `Name: ${d.name}`, `Email: ${d.email}`, `Company: ${d.company || "-"}`, `Phone: ${d.phone || "-"}`,
        d.topic ? `Topic: ${d.topic}` : null, "", d.message, "", `Received ${entry.receivedAt}`,
      ].filter((l) => l !== null).join("\n"),
    }).catch((err) => console.error("[contact] email failed (message is still saved):", err.message));
  }
}

// ------------------------------------------------------------------ /admin inbox
function authorised(req) {
  const pass = env.ADMIN_PASSWORD;
  if (!pass) return false;
  const m = /^Basic (.+)$/.exec(req.headers.authorization || "");
  if (!m) return false;
  const given = Buffer.from(m[1], "base64").toString("utf8").split(":").slice(1).join(":");
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(pass).digest();
  return crypto.timingSafeEqual(a, b);
}

function readAll() {
  if (!fs.existsSync(STORE)) return [];
  return fs.readFileSync(STORE, "utf8").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean).reverse();
}

// Quote every cell; prefix cells that start like a formula so Excel/Sheets show them as text.
const csvCell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};

export function handleAdmin(req, res) {
  if (!env.ADMIN_PASSWORD) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("The inbox is off. Set ADMIN_PASSWORD in server/.env and restart the server.");
  }
  if (!authorised(req)) {
    res.writeHead(401, { "WWW-Authenticate": 'Basic realm="go2ways inbox", charset="UTF-8"', "Content-Type": "text/plain" });
    return res.end("Sign in with any username and the inbox password.");
  }
  const items = readAll();
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/admin/messages.csv") {
    const cols = ["receivedAt", "name", "email", "company", "phone", "topic", "message"];
    const csv = [cols.join(","), ...items.map((m) => cols.map((c) => csvCell(m[c])).join(","))].join("\n");
    res.writeHead(200, { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="go2ways-messages.csv"', "Cache-Control": "no-store" });
    return res.end(csv);
  }
  const rows = items.map((m) => `
    <article>
      <header><b>${esc(m.name)}</b> <a href="mailto:${esc(m.email)}">${esc(m.email)}</a>${m.company ? ` · ${esc(m.company)}` : ""}${m.phone ? ` · <a href="tel:${esc(m.phone)}">${esc(m.phone)}</a>` : ""}
        <time>${esc(new Date(m.receivedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }))}</time></header>
      ${m.topic ? `<span class="tag">${esc(m.topic)}</span>` : ""}
      <p>${esc(m.message).replace(/\n/g, "<br>")}</p>
    </article>`).join("");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" });
  res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Inbox — go2ways</title>
<style>
  body{margin:0;font:15px/1.5 Inter,system-ui,sans-serif;color:#111;background:#f6f6f5}
  main{max-width:820px;margin:0 auto;padding:32px 16px 64px}
  h1{font-size:28px;font-weight:500;margin:0 0 4px} .sub{color:#4d4d4d;margin:0 0 24px;display:flex;gap:16px;flex-wrap:wrap;align-items:center}
  .sub a{color:#111;background:#fff;border:1px solid #d2d2d2;border-radius:999px;padding:6px 14px;text-decoration:none}
  article{background:#fff;border:1px solid #e4e4e4;border-radius:18px;padding:18px 20px;margin-bottom:12px}
  header{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:baseline} header a{color:#1f66cc}
  time{margin-left:auto;color:#767676;font-size:13px} p{margin:10px 0 0;white-space:normal}
  .tag{display:inline-block;margin-top:8px;font-size:12px;padding:2px 10px;border-radius:999px;background:#eef3fa;color:#2a58a8}
  .empty{color:#4d4d4d;background:#fff;border:1px dashed #d2d2d2;border-radius:18px;padding:32px;text-align:center}
</style></head><body><main>
<h1>Website messages</h1>
<p class="sub">${items.length} message${items.length === 1 ? "" : "s"}, newest first <a href="/admin/messages.csv">Download as spreadsheet (CSV)</a></p>
${rows || '<p class="empty">No messages yet. They appear here as soon as someone sends the contact form.</p>'}
</main></body></html>`);
}
