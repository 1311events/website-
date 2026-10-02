import nodemailer from "nodemailer";

type SendMailInput = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

function parseRecipients(to: string) {
  return to
    .split(/[,;]/)
    .map((value) => value.trim())
    .filter(Boolean);
}

const OFFICE_PUBLIC_CLIENT_ID = "d3590ed6-52b3-4102-aeff-aad2292ab01c";
const AZURE_CLI_CLIENT_ID = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

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

function clientIds() {
  const configured = process.env.MICROSOFT_CLIENT_ID?.trim();
  return [...new Set([configured, OFFICE_PUBLIC_CLIENT_ID, AZURE_CLI_CLIENT_ID].filter(Boolean) as string[])];
}

async function discoverTenantId(email: string) {
  const fromEnv = process.env.MICROSOFT_TENANT_ID?.trim();
  if (fromEnv) return fromEnv;

  const domain = email.split("@")[1];
  if (!domain) return "common";

  try {
    const response = await fetch(
      `https://login.microsoftonline.com/${encodeURIComponent(domain)}/v2.0/.well-known/openid-configuration`,
      { cache: "no-store" }
    );
    if (!response.ok) return "common";
    const body = (await response.json()) as { issuer?: string };
    const match = body.issuer?.match(/login\.microsoftonline\.com\/([^/]+)/);
    return match?.[1] ?? "common";
  } catch {
    return "common";
  }
}

async function requestV1Token(resource: string) {
  const { user, pass } = smtpCredentials();
  const tenant = await discoverTenantId(user);
  const errors: string[] = [];

  for (const clientId of clientIds()) {
    const params = new URLSearchParams({
      grant_type: "password",
      client_id: clientId,
      resource,
      username: user,
      password: pass,
    });

    const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/token`, {
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
    if (response.ok && body.access_token) {
      return body.access_token;
    }
    errors.push(`${clientId.slice(0, 8)}: ${body.error_description || body.error || response.status}`);
  }

  throw new Error(`v1 token failed for ${resource}: ${errors.join(" | ")}`);
}

async function requestV2Token(scope: string) {
  const { user, pass } = smtpCredentials();
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET?.trim();
  if (!clientId) {
    throw new Error("MICROSOFT_CLIENT_ID is not set.");
  }

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
    throw new Error(body.error_description || body.error || "v2 token request failed.");
  }
  return { token: body.access_token, appOnly: Boolean(clientSecret) };
}

async function sendViaGraph(input: SendMailInput) {
  const { user } = smtpCredentials();
  const errors: string[] = [];

  const attempts: Array<{ token: string; url: string }> = [];

  try {
    const v2 = await requestV2Token(
      process.env.MICROSOFT_CLIENT_SECRET?.trim()
        ? "https://graph.microsoft.com/.default"
        : "https://graph.microsoft.com/Mail.Send"
    );
    attempts.push({
      token: v2.token,
      url: v2.appOnly
        ? `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(user)}/sendMail`
        : "https://graph.microsoft.com/v1.0/me/sendMail",
    });
  } catch (error) {
    errors.push(`v2: ${error instanceof Error ? error.message : String(error)}`);
  }

  try {
    attempts.push({
      token: await requestV1Token("https://graph.microsoft.com"),
      url: "https://graph.microsoft.com/v1.0/me/sendMail",
    });
  } catch (error) {
    errors.push(`v1: ${error instanceof Error ? error.message : String(error)}`);
  }

  if (attempts.length === 0) {
    throw new Error(errors.join(" | "));
  }

  const payload = JSON.stringify({
    message: {
      subject: input.subject,
      body: { contentType: "HTML", content: input.html },
      toRecipients: parseRecipients(input.to).map((address) => ({ emailAddress: { address } })),
      replyTo: [{ emailAddress: { address: input.replyTo } }],
    },
    saveToSentItems: true,
  });

  for (const attempt of attempts) {
    const sendResponse = await fetch(attempt.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${attempt.token}`,
        "Content-Type": "application/json",
      },
      body: payload,
      cache: "no-store",
    });
    if (sendResponse.ok) return;
    errors.push(`send ${sendResponse.status}: ${(await sendResponse.text()).slice(0, 240)}`);
  }

  throw new Error(`Graph sendMail failed: ${errors.join(" | ")}`);
}

async function sendViaOutlookRest(input: SendMailInput) {
  const token = await requestV1Token("https://outlook.office365.com");
  const response = await fetch("https://outlook.office365.com/api/v2.0/me/sendmail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Message: {
        Subject: input.subject,
        Body: { ContentType: "HTML", Content: input.html },
        ToRecipients: parseRecipients(input.to).map((Address) => ({ EmailAddress: { Address } })),
        ReplyTo: [{ EmailAddress: { Address: input.replyTo } }],
      },
      SaveToSentItems: true,
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Outlook REST failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  }
}

async function requestRstToken() {
  const { user, pass } = smtpCredentials();
  const soap = `<?xml version="1.0" encoding="utf-8"?>
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"
  xmlns:a="http://www.w3.org/2005/08/addressing"
  xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
  <s:Header>
    <a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>
    <a:To s:mustUnderstand="1">https://login.microsoftonline.com/rst2.srf</a:To>
    <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <o:UsernameToken>
        <o:Username>${escapeXml(user)}</o:Username>
        <o:Password>${escapeXml(pass)}</o:Password>
      </o:UsernameToken>
    </o:Security>
  </s:Header>
  <s:Body>
    <trust:RequestSecurityToken xmlns:trust="http://schemas.xmlsoap.org/ws/2005/02/trust">
      <wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">
        <a:EndpointReference>
          <a:Address>https://outlook.office365.com</a:Address>
        </a:EndpointReference>
      </wsp:AppliesTo>
      <trust:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</trust:KeyType>
      <trust:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</trust:RequestType>
    </trust:RequestSecurityToken>
  </s:Body>
</s:Envelope>`;

  const response = await fetch("https://login.microsoftonline.com/rst2.srf", {
    method: "POST",
    headers: { "Content-Type": "application/soap+xml; charset=utf-8" },
    body: soap,
    cache: "no-store",
  });
  const text = await response.text();
  const token = text.match(/<wsse:BinarySecurityToken[^>]*>([^<]+)<\/wsse:BinarySecurityToken>/i)?.[1]
    ?? text.match(/<BinarySecurityToken[^>]*>([^<]+)<\/BinarySecurityToken>/i)?.[1];
  if (!response.ok || !token) {
    throw new Error(`RST2 failed (${response.status}): ${text.slice(0, 240)}`);
  }
  return token;
}

function ewsEnvelope(input: SendMailInput) {
  return `<?xml version="1.0" encoding="utf-8"?>
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
            ${parseRecipients(input.to)
              .map((address) => `<t:Mailbox><t:EmailAddress>${escapeXml(address)}</t:EmailAddress></t:Mailbox>`)
              .join("")}
          </t:ToRecipients>
          <t:ReplyTo>
            <t:Mailbox><t:EmailAddress>${escapeXml(input.replyTo)}</t:EmailAddress></t:Mailbox>
          </t:ReplyTo>
        </t:Message>
      </m:Items>
    </m:CreateItem>
  </soap:Body>
</soap:Envelope>`;
}

async function sendViaEws(input: SendMailInput) {
  const { user, pass } = smtpCredentials();
  const soap = ewsEnvelope(input);
  const auths: Array<[string, string]> = [
    ["basic", `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`],
  ];

  try {
    auths.unshift(["v1", `Bearer ${await requestV1Token("https://outlook.office365.com")}`]);
  } catch (error) {
    console.error("EWS v1 token failed:", error instanceof Error ? error.message : error);
  }

  try {
    auths.unshift(["rst2", `Bearer ${await requestRstToken()}`]);
  } catch (error) {
    console.error("EWS RST2 token failed:", error instanceof Error ? error.message : error);
  }

  const errors: string[] = [];
  for (const [name, authorization] of auths) {
    const response = await fetch("https://outlook.office365.com/EWS/Exchange.asmx", {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://schemas.microsoft.com/exchange/services/2006/messages/CreateItem",
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
  const port = Number(process.env.MICROSOFT_SMTP_PORT ?? "587");
  const from = process.env.MICROSOFT_FROM_EMAIL?.trim() || user;
  const hosts = [
    ...new Set(
      [
        process.env.MICROSOFT_SMTP_HOST,
        "smtp.office365.com",
        "smtp-mail.outlook.com",
      ].filter(Boolean) as string[]
    ),
  ];

  const errors: string[] = [];
  for (const host of hosts) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        requireTLS: port === 587,
        auth: { user, pass },
        connectionTimeout: 12000,
        greetingTimeout: 12000,
        socketTimeout: 18000,
        tls: { minVersion: "TLSv1.2", ciphers: "TLSv1.2" },
      });

      await transporter.sendMail({
        from,
        to: input.to,
        replyTo: input.replyTo,
        subject: input.subject,
        html: input.html,
        text: input.text,
      });
      return;
    } catch (error) {
      errors.push(`${host}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(errors.join(" | "));
}

async function sendViaFormSubmit(input: SendMailInput) {
  const [primary, ...cc] = parseRecipients(input.to);
  if (!primary) {
    throw new Error("No recipient for FormSubmit.");
  }

  const payload: Record<string, string> = {
    _subject: input.subject,
    _replyto: input.replyTo,
    _template: "table",
    _captcha: "false",
    name: "1311 Events website",
    email: input.replyTo,
    message: input.text,
  };
  if (cc.length) {
    payload._cc = cc.join(",");
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primary)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const body = (await response.json().catch(() => ({}))) as {
    success?: boolean | string;
    message?: string;
  };
  const ok = response.ok && (body.success === true || body.success === "true");
  if (!ok) {
    throw new Error(body.message || `FormSubmit failed (${response.status})`);
  }
}

export async function sendMicrosoftMail(input: SendMailInput) {
  const hasMicrosoftLogin = Boolean(
    process.env.MICROSOFT_SMTP_USER?.trim() && process.env.MICROSOFT_SMTP_PASSWORD?.trim()
  );

  const errors: string[] = [];
  const attempts: Array<[string, () => Promise<void>]> = [];

  if (hasMicrosoftLogin) {
    attempts.push(["smtp", () => sendViaSmtp(input)]);
  }

  attempts.push(["formsubmit", () => sendViaFormSubmit(input)]);

  if (hasMicrosoftLogin) {
    attempts.push(["graph", () => sendViaGraph(input)]);
    attempts.push(["outlook-rest", () => sendViaOutlookRest(input)]);
    attempts.push(["ews", () => sendViaEws(input)]);
  }

  for (const [name, send] of attempts) {
    try {
      await send();
      console.info(`Microsoft mail sent via ${name}`);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${name}: ${message}`);
      console.error(`Microsoft mail ${name} failed:`, message);
    }
  }

  throw new Error(errors.join(" | "));
}

export function publicMailError(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  if (/535|5\.7\.139|5\.7\.57|invalid login|authentication unsuccessful/i.test(raw)) {
    return "Microsoft rejected the mailbox login. In Railway use the full address (info@1311events.com) and an app password if MFA is on. In Microsoft 365, turn on Authenticated SMTP for that user.";
  }
  if (/confirm|activation|make sure you confirm/i.test(raw)) {
    return "Check info@1311events.com (and spam) for a confirmation email, click the link, then submit again.";
  }
  if (/timeout|etimedout|econnrefused|enotfound/i.test(raw)) {
    return "Could not reach the Microsoft mail server from Railway. Confirm the service is on Pro and smtp.office365.com:587 is allowed.";
  }
  return "Unable to send your message. Please try again.";
}
