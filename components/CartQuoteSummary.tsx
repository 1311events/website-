"use client";

import { formatMoney, type RentalQuote } from "@/lib/rental-quote";

type CartQuoteSummaryProps = {
  quote: RentalQuote;
  compact?: boolean;
};

function Row({
  label,
  value,
  hint,
  emphasis,
}: {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 ${emphasis ? "pt-3 mt-1 border-t border-white/10" : ""}`}>
      <div>
        <p
          className={`text-[10px] uppercase tracking-[0.2em] ${
            emphasis ? "text-white/70" : "text-white/40"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </p>
        {hint ? (
          <p
            className="text-[11px] text-white/30 mt-1 max-w-[16rem] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {hint}
          </p>
        ) : null}
      </div>
      <p
        className={`tabular-nums shrink-0 ${
          emphasis ? "text-lg text-white" : "text-sm text-[#AF8858]"
        }`}
        style={{
          fontFamily: emphasis ? "var(--font-display)" : "var(--font-body)",
          fontWeight: emphasis ? 400 : 500,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default function CartQuoteSummary({ quote, compact = false }: CartQuoteSummaryProps) {
  if (!quote.hasPricedItems) {
    return (
      <div className={compact ? "" : "border border-white/10 px-6 py-5"}>
        <p
          className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Quote summary
        </p>
        <p className="text-lg text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
          On request
        </p>
        <p className="text-xs text-white/40 mt-2" style={{ fontFamily: "var(--font-body)" }}>
          Pricing for these items will be confirmed in your quote.
        </p>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-3" : "border border-white/10 px-6 py-6 space-y-3"}>
      {!compact && (
        <p
          className="text-[10px] uppercase tracking-[0.25em] text-[#AF8858] mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Quote summary
        </p>
      )}
      <Row label="Rental subtotal" value={formatMoney(quote.subtotal)} />
      <Row
        label="Delivery"
        value={quote.deliveryFee === 0 ? "Free" : formatMoney(quote.deliveryFee)}
        hint={
          compact
            ? undefined
            : quote.deliveryFee === 0
              ? "Complimentary on rental orders of $500 or more."
              : "20% of rentals. Free when the rental subtotal is $500 or more."
        }
      />
      <Row
        label="Tax"
        value={formatMoney(quote.tax)}
        hint={compact ? undefined : "Applied to rentals plus delivery."}
      />
      <Row label="Estimated total" value={formatMoney(quote.total)} emphasis />
      {quote.hasUnpriced && (
        <p className="text-[11px] text-white/35 pt-1" style={{ fontFamily: "var(--font-body)" }}>
          Quote-only items are not included in this estimate.
        </p>
      )}
    </div>
  );
}
