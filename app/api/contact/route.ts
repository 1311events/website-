import { NextResponse } from "next/server";
import {
  buildContactEmailContent,
  isValidContactPayload,
} from "@/lib/contact-email";
import { sendMicrosoftMail, publicMailError } from "@/lib/microsoft-mail";

const RECIPIENT = process.env.CONTACT_RECIPIENT ?? "info@1311events.com";

export async function POST(request: Request) {
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
    return NextResponse.json({ error: publicMailError(error) }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
