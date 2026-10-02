"use client";

import { useMemo, useState } from "react";
import {
  CAVIAR_PRODUCTS,
  CAVIAR_TINS,
  SEAFOOD_ADDONS,
  formatWholesale,
  wholesalePrice,
} from "@/data/caviar-catalog";
import { caviarOrderMailtoHref, type CaviarOrderPayload } from "@/lib/caviar-order";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  color: "rgba(255,255,255,0.85)",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  width: "100%",
  padding: "12px 14px",
};

export default function CaviarOrderForm() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [seafood, setSeafood] = useState<Record<string, boolean>>({});
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  const payload = useMemo<CaviarOrderPayload>(() => {
    const caviar = Object.entries(qty)
      .filter(([, quantity]) => quantity > 0)
      .map(([key, quantity]) => {
        const [productId, tinId] = key.split("::");
        return { productId, tinId, quantity };
      });
    const seafoodLines = SEAFOOD_ADDONS.filter((item) => seafood[item.id]).map((item) => ({
      addonId: item.id,
    }));
    return {
      name,
      company,
      phone,
      email,
      eventDate,
      deliveryDate,
      notes,
      caviar,
      seafood: seafoodLines,
    };
  }, [qty, seafood, name, company, phone, email, eventDate, deliveryDate, notes]);

  const caviarEstimate = useMemo(() => {
    return payload.caviar.reduce((sum, line) => {
      const product = CAVIAR_PRODUCTS.find((item) => item.id === line.productId);
      const tin = CAVIAR_TINS.find((item) => item.id === line.tinId);
      if (!product || !tin) return sum;
      return sum + wholesalePrice(product.ratePerGram, tin.grams) * line.quantity;
    }, 0);
  }, [payload.caviar]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setMailtoHref(null);

    try {
      const response = await fetch("/api/caviar-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your order request.");
      }
      setSubmitted(true);
    } catch (error) {
      setMailtoHref(caviarOrderMailtoHref(payload));
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your order request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-[#AF8858]/40 px-8 py-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4">Request received</p>
        <h3 className="text-3xl text-white mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Thank you for your order inquiry.
        </h3>
        <p className="text-sm text-white/55" style={{ fontFamily: "var(--font-body)" }}>
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-16">
      {CAVIAR_PRODUCTS.map((product) => (
        <section key={product.id} className="border border-white/10">
          <div className="px-5 sm:px-8 py-8 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858] mb-2">{product.subtitle}</p>
            <h3 className="text-3xl sm:text-4xl text-white mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              {product.name}
            </h3>
            <p className="text-sm text-white/50 max-w-2xl leading-relaxed">{product.positioning}</p>
            <p className="text-xs text-white/40 mt-4 uppercase tracking-[0.18em]">
              Wholesale {formatWholesale(product.ratePerGram)} / gram
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-[#AF8858]/35">
                  {["Tin size", "Grams", "Serving", "Wholesale", "Suggested retail", "Qty"].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 sm:px-8 py-3 text-[10px] uppercase tracking-[0.18em] text-[#AF8858] font-medium"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAVIAR_TINS.map((tin) => {
                  const key = `${product.id}::${tin.id}`;
                  const unit = wholesalePrice(product.ratePerGram, tin.grams);
                  return (
                    <tr key={tin.id} className="border-b border-white/8">
                      <td className="px-5 sm:px-8 py-4 text-sm text-white">{tin.label}</td>
                      <td className="px-5 sm:px-8 py-4 text-sm text-white/55">{tin.grams}g</td>
                      <td className="px-5 sm:px-8 py-4 text-sm text-white/45">{tin.serving}</td>
                      <td className="px-5 sm:px-8 py-4 text-sm text-[#AF8858]">{formatWholesale(unit)}</td>
                      <td className="px-5 sm:px-8 py-4 text-sm text-white/45">
                        {product.suggestedRetail[tin.grams] ?? "—"}
                      </td>
                      <td className="px-5 sm:px-8 py-4">
                        <label className="sr-only" htmlFor={key}>
                          Quantity of {product.name} {tin.label}
                        </label>
                        <input
                          id={key}
                          type="number"
                          min={0}
                          step={1}
                          value={qty[key] ?? 0}
                          onChange={(event) =>
                            setQty((current) => ({
                              ...current,
                              [key]: Math.max(0, Number(event.target.value) || 0),
                            }))
                          }
                          className="w-20 text-center"
                          style={inputStyle}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="border border-[#AF8858]/35 p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858] mb-2">Optional seafood add-ons</p>
        <h3 className="text-3xl text-white mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Custom-priced hospitality items
        </h3>
        <p className="text-sm text-white/50 mb-6 max-w-2xl">
          Seafood add-on pricing is not published yet. If you select any of these, we will flag the request and call you with custom pricing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SEAFOOD_ADDONS.map((item) => (
            <label
              key={item.id}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer ${
                seafood[item.id] ? "border-[#AF8858] bg-[#AF8858]/10" : "border-white/12"
              }`}
            >
              <input
                type="checkbox"
                checked={Boolean(seafood[item.id])}
                onChange={(event) =>
                  setSeafood((current) => ({ ...current, [item.id]: event.target.checked }))
                }
                className="accent-[#AF8858]"
              />
              <span className="text-sm text-white">{item.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858]">Your details</p>
          <h3 className="text-3xl text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Request order
          </h3>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
            Name
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2" style={inputStyle} autoComplete="name" />
          </label>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
            Restaurant / Company
            <input required value={company} onChange={(e) => setCompany(e.target.value)} className="mt-2" style={inputStyle} autoComplete="organization" />
          </label>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
            Phone
            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" style={inputStyle} autoComplete="tel" />
          </label>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
            Email
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" style={inputStyle} autoComplete="email" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
              Event date (optional)
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="mt-2" style={inputStyle} />
            </label>
            <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
              Delivery date requested
              <input required type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="mt-2" style={inputStyle} />
            </label>
          </div>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
            Notes / special requests
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="mt-2 resize-y" style={inputStyle} />
          </label>
        </div>

        <div className="border border-white/10 p-6 sm:p-8 h-fit">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858] mb-4">Inquiry summary</p>
          <p className="text-sm text-white/55 mb-6">
            This is an order request, not a checkout. Wholesale totals are estimates for caviar only. Seafood is flagged for a pricing call. Payment and invoicing follow by our sales team.
          </p>
          <p className="text-2xl text-white mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            {formatWholesale(caviarEstimate)}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-white/35 mb-8">Estimated caviar wholesale</p>
          {payload.seafood.length > 0 && (
            <p className="text-xs text-[#AF8858] mb-8 uppercase tracking-[0.16em]">
              Seafood add-on selected — we will call you
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full text-xs uppercase tracking-[0.28em] px-8 py-4 bg-[#AF8858] text-white hover:bg-[#C5A070] disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Request Order"}
          </button>
          {submitError && (
            <div className="mt-5 text-sm text-white/70">
              <p className="mb-2">{submitError}</p>
              {mailtoHref && (
                <a href={mailtoHref} className="text-[#AF8858] underline underline-offset-4">
                  Email Jordan &amp; Maryssa instead
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </form>
  );
}
