import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot check for bots
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 200);
    const company = String(body.company || "").trim().slice(0, 160);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const message = String(body.message || "").trim().slice(0, 4000);
    const topic = String(body.topic || "").trim().slice(0, 60);

    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = "Please enter a valid work email.";
    }
    if (phone && !/^[+()\d\s-]{7,}$/.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (message.length < 10) {
      errors.message = "Tell us a little more (at least 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", errors },
        { status: 422 }
      );
    }

    // Optional SMTP dispatch
    const env = process.env;
    if (env.SMTP_HOST && env.NOTIFY_TO) {
      const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT) || 587,
        secure: Number(env.SMTP_PORT) === 465,
        auth: env.SMTP_USER
          ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
          : undefined,
      });

      await transporter.sendMail({
        from: env.NOTIFY_FROM || env.SMTP_USER || "no-reply@go2ways.com",
        to: env.NOTIFY_TO,
        replyTo: `${name} <${email}>`,
        subject: `New website enquiry from ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "-"}`,
          `Phone: ${phone || "-"}`,
          topic ? `Topic: ${topic}` : null,
          "",
          message,
          "",
          `Received at ${new Date().toISOString()}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }).catch((err) => console.error("[contact email failed]", err));
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[contact error]", err);
    return NextResponse.json(
      { error: "Could not submit form. Please email support@go2ways.com." },
      { status: 500 }
    );
  }
}
