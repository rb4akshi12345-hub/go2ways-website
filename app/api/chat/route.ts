import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

let knowledgeText = "";
try {
  const filePath = path.join(process.cwd(), "data", "knowledge.md");
  if (fs.existsSync(filePath)) {
    knowledgeText = fs.readFileSync(filePath, "utf8");
  }
} catch {
  // Graceful fallback
}

const SYSTEM_PROMPT = `You are the go2ways website assistant. You chat with visitors on go2ways' website and help them understand what the company does, find the right service or product page, and get in touch with the team.

How to answer:
- Answer only from the company briefing below. If something isn't covered, say you don't have that detail and point the visitor to the team (email, phone or the contact form).
- Keep replies short: two to four sentences, or a brief bullet list.
- When a page on the site answers the question, link it with a markdown link (e.g. [MAS Migration](/services/mas-migration)).
- Formatting: plain text, markdown links, **bold**, and "- " bullet lists.
- Stay on topic. For unrelated requests, say briefly that you can only help with questions about go2ways.

<company_briefing>
${knowledgeText}
</company_briefing>`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI is not configured (missing ANTHROPIC_API_KEY)." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const userMessage = String(body.message || "").trim().slice(0, 600);
    if (!userMessage) {
      return NextResponse.json({ error: "Empty message." }, { status: 400 });
    }

    const client = new Anthropic({ apiKey });
    const model = process.env.CHAT_MODEL || "claude-3-5-haiku-20241022";

    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    const messages: Array<{ role: "user" | "assistant"; content: string }> = [];

    for (const m of history) {
      if (m && (m.role === "user" || m.role === "assistant") && m.content) {
        messages.push({ role: m.role, content: String(m.content).slice(0, 1500) });
      }
    }
    messages.push({ role: "user", content: userMessage });

    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content
      .filter((block: any) => block.type === "text")
      .map((block: any) => block.text)
      .join("\n");

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("[api/chat error]", err);
    return NextResponse.json(
      { error: "AI failed to respond. Please contact support." },
      { status: 500 }
    );
  }
}
