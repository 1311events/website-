export const HAWAII_GET_RATE = 0.04712;
export const DELIVERY_FREE_THRESHOLD = 500;
export const DELIVERY_PERCENT = 0.2;

export type QuoteLine = {
  price: string;
  quantity: number;
};

export type RentalQuote = {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  hasPricedItems: boolean;
  hasUnpriced: boolean;
};

export function parsePrice(price: string): number | null {
  if (!price || /tbd/i.test(price)) return null;
  const match = price.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function lineTotal(line: QuoteLine): number | null {
  const unit = parsePrice(line.price);
  if (unit === null) return null;
  return roundMoney(unit * line.quantity);
}

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function computeRentalQuote(items: QuoteLine[]): RentalQuote {
  let subtotal = 0;
  let hasPricedItems = false;
  let hasUnpriced = false;

  for (const line of items) {
    const total = lineTotal(line);
    if (total === null) {
      hasUnpriced = true;
      continue;
    }
    hasPricedItems = true;
    subtotal += total;
  }

  subtotal = roundMoney(subtotal);

  if (!hasPricedItems) {
    return {
      subtotal: 0,
      deliveryFee: 0,
      tax: 0,
      total: 0,
      hasPricedItems: false,
      hasUnpriced,
    };
  }

  const deliveryFee =
    subtotal >= DELIVERY_FREE_THRESHOLD
      ? 0
      : roundMoney(subtotal * DELIVERY_PERCENT);
  const taxable = roundMoney(subtotal + deliveryFee);
  const tax = roundMoney(taxable * HAWAII_GET_RATE);
  const total = roundMoney(taxable + tax);

  return { subtotal, deliveryFee, tax, total, hasPricedItems, hasUnpriced };
}

export function formatQuoteEmail(quote: RentalQuote): string {
  if (!quote.hasPricedItems) {
    return "Estimated total: On request (includes TBD items)";
  }

  const lines = [
    `Rental subtotal: ${formatMoney(quote.subtotal)}`,
    `Delivery (free at $500+, otherwise 20% of rentals): ${
      quote.deliveryFee === 0 ? "Free" : formatMoney(quote.deliveryFee)
    }`,
    `Tax: ${formatMoney(quote.tax)}`,
    `Estimated total: ${formatMoney(quote.total)}`,
  ];

  if (quote.hasUnpriced) {
    lines.push("Note: Some items are quote-only and are not included in this estimate.");
  }

  return lines.join("\n");
}
