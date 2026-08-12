import { NextResponse } from "next/server";
import {
  buildContactEmailContent,
  isValidContactPayload,
} from "@/lib/contact-email";
import { sendMicrosoftMail } from "@/lib/microsoft-mail";

const RECIPIENT = process.env.CONTACT_RECIPIENT ?? "info@1311events.com";

export async function POST(request: Request) {
  if (!process.env.MICROSOFT_SMTP_USER || !process.env.MICROSOFT_SMTP_PASSWORD) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidContactPayload(body)) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const email = buildContactEmailContent(body);

  try {
    await sendMicrosoftMail({
      to: RECIPIENT,
      replyTo: body.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
  } catch (error) {
    console.error("Microsoft SMTP error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
