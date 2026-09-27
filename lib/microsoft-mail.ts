import nodemailer from "nodemailer";

type SendMailInput = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

/** Public Microsoft Office client — used only when MICROSOFT_CLIENT_ID is unset. */
const OFFICE_PUBLIC_CLIENT_ID = "d3590ed6-52b3-4102-aeff-aad2292ab01c";

function smtpCredentials() {
  const user = process.env.MICROSOFT_SMTP_USER?.trim();
  const pass = process.env.MICROSOFT_SMTP_PASSWORD?.trim();
  if (!user || !pass) {
    throw new Error("Microsoft SMTP is not configured.");
  }
  return { user, pass };
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function discoverTenantId(email: string) {
  const fromEnv = process.env.MICROSOFT_TENANT_ID?.trim();
  if (fromEnv) return fromEnv;

  const domain = email.split("@")[1];
  if (!domain) return "organizations";

  try {
    const response = await fetch(
      `https://login.microsoftonline.com/${encodeURIComponent(domain)}/v2.0/.well-known/openid-configuration`,
      { cache: "no-store" }
    );
    if (!response.ok) return "organizations";
    const body = (await response.json()) as { issuer?: string };
    const match = body.issuer?.match(/login\.microsoftonline\.com\/([^/]+)/);
    return match?.[1] ?? "organizations";
  } catch {
    return "organizations";
  }
}

async function requestAccessToken(scope: string, clientId: string, clientSecret?: string) {
  const { user, pass } = smtpCredentials();
  const tenant = await discoverTenantId(user);
  const params = new URLSearchParams();
  params.set("client_id", clientId);
  params.set("scope", scope);

  if (clientSecret) {
    params.set("client_secret", clientSecret);
    params.set("grant_type", "client_credentials");
  } else {
    params.set("grant_type", "password");
    params.set("username", user);
    params.set("password", pass);
  }

  const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
    cache: "no-store",
  });
  const body = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
  if (!response.ok || !body.access_token) {
    throw new Error(body.error_description || body.error || "Token request failed.");
  }
  return body.access_token;
}

async function sendViaGraph(input: SendMailInput) {
  const { user } = smtpCredentials();
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim() || OFFICE_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET?.trim();

  const token = clientSecret
    ? await requestAccessToken("https://graph.microsoft.com/.default", clientId, clientSecret)
    : await requestAccessToken("https://graph.microsoft.com/Mail.Send", clientId);

  const sendUrl = clientSecret
    ? `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(user)}/sendMail`
    : "https://graph.microsoft.com/v1.0/me/sendMail";

  const sendResponse = await fetch(sendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: input.subject,
        body: { contentType: "HTML", content: input.html },
        toRecipients: [{ emailAddress: { address: input.to } }],
        replyTo: [{ emailAddress: { address: input.replyTo } }],
      },
      saveToSentItems: true,
    }),
    cache: "no-store",
  });

  if (!sendResponse.ok) {
    const detail = await sendResponse.text();
    throw new Error(`Graph sendMail failed (${sendResponse.status}): ${detail.slice(0, 400)}`);
  }
}

async function sendViaEws(input: SendMailInput) {
  const { user, pass } = smtpCredentials();
  const soap = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages"
  xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <t:RequestServerVersion Version="Exchange2016" />
  </soap:Header>
  <soap:Body>
    <m:CreateItem MessageDisposition="SendAndSaveCopy">
      <m:SavedItemFolderId>
        <t:DistinguishedFolderId Id="sentitems" />
      </m:SavedItemFolderId>
      <m:Items>
        <t:Message>
          <t:Subject>${escapeXml(input.subject)}</t:Subject>
          <t:Body BodyType="HTML">${escapeXml(input.html)}</t:Body>
          <t:ToRecipients>
            <t:Mailbox><t:EmailAddress>${escapeXml(input.to)}</t:EmailAddress></t:Mailbox>
          </t:ToRecipients>
          <t:ReplyTo>
            <t:Mailbox><t:EmailAddress>${escapeXml(input.replyTo)}</t:EmailAddress></t:Mailbox>
          </t:ReplyTo>
        </t:Message>
      </m:Items>
    </m:CreateItem>
  </soap:Body>
</soap:Envelope>`;

  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim() || OFFICE_PUBLIC_CLIENT_ID;
  const auths: Array<[string, string]> = [["basic", `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`]];

  try {
    const token = await requestAccessToken("https://outlook.office365.com/EWS.AccessAsUser.All", clientId);
    auths.unshift(["bearer", `Bearer ${token}`]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("EWS OAuth token failed:", message);
  }

  const errors: string[] = [];
  for (const [name, authorization] of auths) {
    const response = await fetch("https://outlook.office365.com/EWS/Exchange.asmx", {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "text/xml; charset=utf-8",
      },
      body: soap,
      cache: "no-store",
    });
    const text = await response.text();
    if (response.ok && !/Fault>|ResponseCode>Error/i.test(text)) {
      return;
    }
    errors.push(`${name} ${response.status}: ${text.slice(0, 180)}`);
  }

  throw new Error(`EWS send failed: ${errors.join(" | ")}`);
}

async function sendViaSmtp(input: SendMailInput) {
  const { user, pass } = smtpCredentials();
  const host = process.env.MICROSOFT_SMTP_HOST ?? "smtp.office365.com";
  const port = Number(process.env.MICROSOFT_SMTP_PORT ?? "587");
  const from = process.env.MICROSOFT_FROM_EMAIL?.trim() || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    tls: { minVersion: "TLSv1.2" },
  });

  await transporter.sendMail({
    from: `1311 Events <${from}>`,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}

export async function sendMicrosoftMail(input: SendMailInput) {
  smtpCredentials();

  const errors: string[] = [];
  const attempts: Array<[string, () => Promise<void>]> = [
    ["graph", () => sendViaGraph(input)],
    ["ews", () => sendViaEws(input)],
    ["smtp", () => sendViaSmtp(input)],
  ];

  for (const [name, send] of attempts) {
    try {
      await send();
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${name}: ${message}`);
      console.error(`Microsoft mail ${name} failed:`, message);
    }
  }

  throw new Error(errors.join(" | "));
}
