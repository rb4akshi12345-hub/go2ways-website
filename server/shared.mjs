// Rules shared by the Node server (server.mjs) and the free Cloudflare setup (functions/).
// No Node-only APIs here, so it runs in both places.

// ------------------------------------------------------------------ chat
export const MODEL_DEFAULT = "claude-opus-5-5";
export const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY = 12; // previous turns sent to the model
export const REFUSAL_TEXT = "\n\nSorry, I can't help with that here. For anything about go2ways, the team is at support@go2ways.com.";
export const ERROR_MARKER = "\u0000ERROR"; // the chat widget treats this as "fall back to built-in answers"

export function buildSystemPrompt(knowledge) {
  return `You are the go2ways website assistant. You chat with visitors on go2ways' website and help them understand what the company does, find the right service or product page, and get in touch with the team.

How to answer:
- Answer only from the company briefing below. If something isn't covered, say you don't have that detail and point the visitor to the team (email, phone or the contact form). Never guess at prices, numbers, certifications, clients or timelines.
- Keep replies short: two to four sentences, or a brief list when the visitor asks for several things. Write in plain, friendly English.
- When a page on the site answers the question, link it with a markdown link using the path given in the briefing, for example [MAS Migration](/service-mas-migration.html). Link at most two pages per reply.
- Formatting: plain text, markdown links, **bold** for a key term, and "- " bullet lists. No headings, tables or code blocks.
- Stay on topic. For unrelated requests (general knowledge, coding help, opinions), say briefly that you can only help with questions about go2ways.
- You are an automated assistant. Don't claim to be a person, and don't promise anything on the team's behalf (meetings, discounts, deadlines); offer the contact form or booking link instead.

<company_briefing>
${knowledge}
</company_briefing>`;
}

// Turn the widget's history into valid alternating messages that start with a user turn.
export function buildMessages(history, message, page) {
  const out = [];
  for (const m of Array.isArray(history) ? history.slice(-MAX_HISTORY) : []) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    const text = String(m.content || "").slice(0, 1500).trim();
    if (!text) continue;
    if (!out.length && m.role !== "user") continue;
    if (out.length && out[out.length - 1].role === m.role) out[out.length - 1].content += "\n\n" + text;
    else out.push({ role: m.role, content: text });
  }
  if (out.length && out[out.length - 1].role === "user") out.pop(); // the new message replaces a dangling user turn
  out.push({ role: "user", content: message });
  if (page) {
    // Where the visitor is, as an operator note after their message (keeps the cached system prompt stable).
    out.push({ role: "system", content: `The visitor is currently on the page ${String(page).slice(0, 120)}.` });
  }
  return out;
}

// The Claude request used by both setups.
export function chatRequest({ model, systemPrompt, messages }) {
  return {
    model: model || MODEL_DEFAULT,
    // Short chat replies; a cap keeps a public endpoint's cost predictable.
    max_tokens: 4000,
    output_config: { effort: "low" },
    // If the model declines on policy grounds, the API retries on a suitable fallback model.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
    messages,
  };
}

// ------------------------------------------------------------------ contact form
const LIMITS = { name: 120, email: 200, company: 160, phone: 40, message: 4000, topic: 60, page: 120 };

export function cleanContact(body) {
  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) d[k] = String((body && body[k]) ?? "").trim().slice(0, max);
  return d;
}

// Same rules as the form in the browser, so nobody can skip them.
export function validateContact(d) {
  const errors = {};
  if (d.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = "Please enter a valid work email.";
  if (d.phone && !/^[+()\d\s-]{7,}$/.test(d.phone)) errors.phone = "Please enter a valid phone number.";
  if (d.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

// Simple per-visitor limiter (in memory; resets when the process restarts).
export function makeLimiter(max, windowMs) {
  const hits = new Map();
  return function limited(key) {
    const now = Date.now();
    const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
    list.push(now);
    hits.set(key, list);
    if (hits.size > 5000) hits.clear(); // keep memory bounded
    return list.length > max;
  };
}
