import nodemailer from "nodemailer";

type SendMailInput = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

function getTransporter() {
  const user = process.env.MICROSOFT_SMTP_USER;
  const pass = process.env.MICROSOFT_SMTP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Microsoft SMTP is not configured.");
  }

  const host = process.env.MICROSOFT_SMTP_HOST ?? "smtp.office365.com";
  const port = Number(process.env.MICROSOFT_SMTP_PORT ?? "587");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

export async function sendMicrosoftMail(input: SendMailInput) {
  const from =
    process.env.MICROSOFT_FROM_EMAIL ??
    process.env.MICROSOFT_SMTP_USER ??
    "info@1311events.com";

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `1311 Events <${from}>`,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}
