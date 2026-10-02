import {
  CAVIAR_PRODUCTS,
  CAVIAR_SALES_RECIPIENTS,
  CAVIAR_TINS,
  SEAFOOD_ADDONS,
  formatWholesale,
  wholesalePrice,
} from "@/data/caviar-catalog";

export type CaviarLine = {
  productId: string;
  tinId: string;
  quantity: number;
};

export type SeafoodLine = {
  addonId: string;
  notes?: string;
};

export type CaviarOrderPayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
  eventDate?: string;
  deliveryDate: string;
  notes?: string;
  caviar: CaviarLine[];
  seafood: SeafoodLine[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function caviarSalesTo() {
  return (process.env.CAVIAR_ORDER_RECIPIENTS ?? CAVIAR_SALES_RECIPIENTS.join(", ")).trim();
}

export function isValidCaviarOrder(body: unknown): body is CaviarOrderPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  if (
    typeof data.name !== "string" ||
    !data.name.trim() ||
    typeof data.company !== "string" ||
    !data.company.trim() ||
    typeof data.phone !== "string" ||
    !data.phone.trim() ||
    typeof data.email !== "string" ||
    !/^\S+@\S+\.\S+$/.test(data.email) ||
    typeof data.deliveryDate !== "string" ||
    !data.deliveryDate.trim()
  ) {
    return false;
  }

  const caviar = Array.isArray(data.caviar) ? data.caviar : [];
  const seafood = Array.isArray(data.seafood) ? data.seafood : [];
  const caviarOk = caviar.every(
    (line) =>
      line &&
      typeof line === "object" &&
      typeof (line as CaviarLine).productId === "string" &&
      typeof (line as CaviarLine).tinId === "string" &&
      Number((line as CaviarLine).quantity) > 0
  );
  const seafoodOk = seafood.every(
    (line) =>
      line &&
      typeof line === "object" &&
      typeof (line as SeafoodLine).addonId === "string" &&
      SEAFOOD_ADDONS.some((item) => item.id === (line as SeafoodLine).addonId)
  );

  return caviarOk && seafoodOk && (caviar.length > 0 || seafood.length > 0);
}

export function resolveCaviarLines(lines: CaviarLine[]) {
  return lines
    .map((line) => {
      const product = CAVIAR_PRODUCTS.find((item) => item.id === line.productId);
      const tin = CAVIAR_TINS.find((item) => item.id === line.tinId);
      if (!product || !tin || line.quantity < 1) return null;
      const unit = wholesalePrice(product.ratePerGram, tin.grams);
      return {
        product: product.name,
        tin: tin.label,
        grams: tin.grams,
        serving: tin.serving,
        quantity: line.quantity,
        unitPrice: unit,
        lineTotal: unit * line.quantity,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);
}

export function resolveSeafoodLines(lines: SeafoodLine[]) {
  return lines
    .map((line) => {
      const addon = SEAFOOD_ADDONS.find((item) => item.id === line.addonId);
      if (!addon) return null;
      return { name: addon.name, notes: line.notes?.trim() ?? "" };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);
}

export function buildCaviarOrderEmail(data: CaviarOrderPayload) {
  const caviar = resolveCaviarLines(data.caviar);
  const seafood = resolveSeafoodLines(data.seafood);
  const needsCustomPricing = seafood.length > 0;
  const caviarTotal = caviar.reduce((sum, line) => sum + line.lineTotal, 0);

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Restaurant / Company", data.company],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Event Date", data.eventDate?.trim() || "—"],
    ["Delivery Date Requested", data.deliveryDate],
    ["Notes", data.notes?.trim() || "—"],
    [
      "Custom pricing flag",
      needsCustomPricing
        ? "YES — seafood add-on selected. Call the client with custom pricing."
        : "No",
    ],
  ];

  const caviarText = caviar.length
    ? caviar
        .map(
          (line) =>
            `• ${line.product} — ${line.tin} (${line.grams}g, ${line.serving}) × ${line.quantity} @ ${formatWholesale(line.unitPrice)} = ${formatWholesale(line.lineTotal)} wholesale`
        )
        .join("\n")
    : "—";

  const seafoodText = seafood.length
    ? seafood.map((line) => `• ${line.name}${line.notes ? ` — ${line.notes}` : ""}`).join("\n")
    : "—";

  const text = [
    "New caviar & seafood order request",
    "Submitted via 1311events.com/seafood",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Caviar",
    caviarText,
    caviar.length ? `Estimated wholesale subtotal: ${formatWholesale(caviarTotal)}` : "",
    "",
    "Seafood add-ons (custom pricing — call client)",
    seafoodText,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const caviarRows = caviar
    .map(
      (line) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(line.product)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(line.tin)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${line.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(formatWholesale(line.lineTotal))}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#111;">
      <h1 style="font-size:22px;font-weight:400;margin:0 0 8px;">Caviar & seafood order request</h1>
      ${
        needsCustomPricing
          ? `<p style="background:#fff6e8;border:1px solid #AF8858;padding:12px 14px;font-size:14px;margin:0 0 20px;"><strong>Call for custom pricing.</strong> This inquiry includes seafood add-ons. Pricing is not published — contact the client directly.</p>`
          : ""
      }
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${tableRows}</table>
      <h2 style="font-size:16px;font-weight:400;">Caviar</h2>
      ${
        caviar.length
          ? `<table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
              <tr>
                <th style="text-align:left;padding:8px 12px;border-bottom:1px solid #AF8858;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">Product</th>
                <th style="text-align:left;padding:8px 12px;border-bottom:1px solid #AF8858;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">Tin</th>
                <th style="text-align:left;padding:8px 12px;border-bottom:1px solid #AF8858;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">Qty</th>
                <th style="text-align:left;padding:8px 12px;border-bottom:1px solid #AF8858;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">Wholesale</th>
              </tr>
              ${caviarRows}
            </table>
            <p style="font-size:14px;">Estimated wholesale subtotal: <strong>${escapeHtml(formatWholesale(caviarTotal))}</strong> (not including tax, delivery, or seafood).</p>`
          : `<p>—</p>`
      }
      <h2 style="font-size:16px;font-weight:400;">Seafood add-ons</h2>
      <p style="white-space:pre-wrap;font-size:14px;">${escapeHtml(seafoodText)}</p>
    </div>
  `;

  return {
    subject: `Caviar order request from ${data.name}${needsCustomPricing ? " — CALL FOR CUSTOM PRICING" : ""}`,
    text,
    html,
    needsCustomPricing,
  };
}

export function caviarCustomerConfirmation() {
  return {
    subject: "Thank you for your 1311 Events caviar inquiry",
    text: "Thank you for your order inquiry. Our team will contact you shortly.",
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111;">
      <p>Thank you for your order inquiry. Our team will contact you shortly.</p>
      <p style="color:#666;font-size:13px;">1311 Events · Caviar &amp; Seafood · in partnership with Browne Trading Company</p>
    </div>`,
  };
}

export function caviarOrderMailtoHref(data: CaviarOrderPayload) {
  const email = buildCaviarOrderEmail(data);
  const params = new URLSearchParams({
    subject: email.subject,
    body: email.text,
  });
  return `mailto:${caviarSalesTo()}?${params.toString()}`;
}
