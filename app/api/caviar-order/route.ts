import { NextResponse } from "next/server";
import {
  buildCaviarOrderEmail,
  caviarCustomerConfirmation,
  caviarSalesTo,
  isValidCaviarOrder,
} from "@/lib/caviar-order";
import { sendMicrosoftMail } from "@/lib/microsoft-mail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidCaviarOrder(body)) {
    return NextResponse.json(
      { error: "Please complete your details and select at least one product." },
      { status: 400 }
    );
  }

  const team = buildCaviarOrderEmail(body);
  const confirm = caviarCustomerConfirmation();

  try {
    await sendMicrosoftMail({
      to: caviarSalesTo(),
      replyTo: body.email,
      subject: team.subject,
      html: team.html,
      text: team.text,
    });
  } catch (error) {
    console.error("Caviar order email failed:", error);
    return NextResponse.json(
      { error: "Unable to send your order request. Please try again." },
      { status: 502 }
    );
  }

  try {
    await sendMicrosoftMail({
      to: body.email,
      replyTo: caviarSalesTo().split(",")[0]?.trim() || "Jordan@1311Events.com",
      subject: confirm.subject,
      html: confirm.html,
      text: confirm.text,
    });
  } catch (error) {
    console.error("Caviar customer confirmation failed:", error);
  }

  return NextResponse.json({ success: true });
}
