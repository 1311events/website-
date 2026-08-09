import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = "info@1311events.com";

const serviceLabels: Record<string, string> = {
  rentals: "Event Rentals",
  coordination: "Event Coordination",
  decor: "Décor",
  catering: "Catering & Bar",
};

const serviceTypeLabels: Record<string, string> = {
  "will-call": "Will-Call Pick Up",
  "full-service": "Full-Service",
};

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventLocation?: string;
  services?: string[];
  serviceType: string;
  orderDetails?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: ContactPayload): string {
  const services = (data.services ?? [])
    .map((id) => serviceLabels[id] ?? id)
    .join(", ");

  const rows = [
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Event Date", data.eventDate],
    ["Event Location", data.eventLocation || "—"],
    ["Services", services || "—"],
    ["Service Type", serviceTypeLabels[data.serviceType] ?? data.serviceType],
    ["Order Details", data.orderDetails || "—"],
    ["Message", data.message || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:140px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111;">
      <h1 style="font-size:22px;font-weight:400;margin:0 0 8px;">New website inquiry</h1>
      <p style="color:#666;font-size:14px;margin:0 0 24px;">Submitted via the 1311 Events contact form.</p>
      <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
    </div>
  `;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.firstName === "string" &&
    data.firstName.trim().length > 0 &&
    typeof data.lastName === "string" &&
    data.lastName.trim().length > 0 &&
    typeof data.email === "string" &&
    /^\S+@\S+\.\S+$/.test(data.email) &&
    typeof data.phone === "string" &&
    data.phone.trim().length > 0 &&
    typeof data.eventDate === "string" &&
    data.eventDate.trim().length > 0 &&
    typeof data.serviceType === "string" &&
    data.serviceType.trim().length > 0 &&
    (data.services === undefined ||
      (Array.isArray(data.services) && data.services.every((s) => typeof s === "string"))) &&
    (data.eventLocation === undefined || typeof data.eventLocation === "string") &&
    (data.orderDetails === undefined || typeof data.orderDetails === "string") &&
    (data.message === undefined || typeof data.message === "string")
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? "1311 Events <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [RECIPIENT],
    replyTo: body.email,
    subject: `New inquiry from ${body.firstName} ${body.lastName}`,
    html: buildEmailHtml(body),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Unable to send your message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
