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

    // SMTP email dispatch
    const env = process.env;
    const smtpHost = env.SMTP_HOST;
    const smtpUser = env.SMTP_USER || env.SMTP_USERNAME;
    const smtpPass = (env.SMTP_PASS || env.SMTP_APP_PASSWORD || "").replace(/\s+/g, "");
    const notifyTo = env.NOTIFY_TO || smtpUser || "servicego2ways@gmail.com";

    if (smtpHost && notifyTo) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(env.SMTP_PORT) || 587,
        secure: Number(env.SMTP_PORT) === 465,
        auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined,
      });

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <div style="border-bottom: 2px solid #6c3cc9; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #1e293b; font-size: 20px;">New Website Lead</h2>
            <p style="margin: 4px 0 0; color: #64748b; font-size: 14px;">Submitted via go2ways contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Work Email:</strong></td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${email}" style="color: #6c3cc9; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Company:</strong></td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${company || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${phone || "Not specified"}</td>
            </tr>
            ${topic ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Interest:</strong></td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><span style="background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 500;">${topic}</span></td>
            </tr>
            ` : ""}
          </table>

          <div style="background: #f8fafc; border-left: 4px solid #6c3cc9; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 12px; color: #94a3b8; text-align: center;">
            Received on ${new Date().toUTCString()} &bull; go2ways Website
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: env.NOTIFY_FROM || env.SMTP_USER || "no-reply@go2ways.com",
        to: env.NOTIFY_TO,
        replyTo: `${name} <${email}>`,
        subject: `New Lead: ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "-"}`,
          `Phone: ${phone || "-"}`,
          topic ? `Topic: ${topic}` : null,
          "",
          "Message:",
          message,
          "",
          `Received at ${new Date().toISOString()}`,
        ]
          .filter(Boolean)
          .join("\n"),
        html: htmlContent,
      });
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

