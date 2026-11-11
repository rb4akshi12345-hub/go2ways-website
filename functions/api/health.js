// Cloudflare Pages Function: GET /api/health — shows which features are switched on.
export function onRequestGet({ env }) {
  return new Response(
    JSON.stringify({
      ok: true,
      chatAI: Boolean(env.ANTHROPIC_API_KEY),
      contactForm: Boolean(env.SHEETS_WEBHOOK_URL && env.SHEETS_SECRET),
    }),
    { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } },
  );
}
