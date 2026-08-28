"use client";

import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatMoney, lineTotal, useCart } from "@/components/CartProvider";
import CartQuoteSummary from "@/components/CartQuoteSummary";
import { formatQuoteEmail } from "@/lib/rental-quote";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventLocation: string;
  services: string[];
  serviceType: string;
  orderDetails: string;
  message: string;
};

const serviceOptions = [
  { id: "rentals", label: "Event Rentals" },
  { id: "coordination", label: "Event Coordination" },
  { id: "decor", label: "Décor" },
  { id: "catering", label: "Catering & Bar" },
];

const serviceTypes = [
  { id: "will-call", label: "Will-Call Pick Up", sub: "To and from Kapolei Warehouse" },
  { id: "full-service", label: "Full-Service", sub: "Delivery, Set Up & Breakdown" },
];

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { items, quote, clearCart } = useCart();

  const cartDetails = useMemo(() => {
    if (!items.length) return "";
    const lines = items.map((line) => {
      const total = lineTotal(line);
      const totalLabel = total !== null ? ` = ${formatMoney(total)}` : "";
      return `• ${line.name} (${line.category}) — Qty: ${line.quantity} × ${line.price}${totalLabel}`;
    });
    return ["Inventory cart selection:", ...lines, "", formatQuoteEmail(quote)].join("\n");
  }, [items, quote]);

  const fromCart = searchParams.get("from") === "cart";
  const hasCartItems = items.length > 0;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    defaultValues: {
      services: hasCartItems ? ["rentals"] : [],
      orderDetails: "",
    },
  });

  useEffect(() => {
    if (cartDetails) {
      setValue("orderDetails", cartDetails);
      setValue("services", ["rentals"]);
    }
  }, [cartDetails, setValue]);

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message.");
      }

      if (items.length) clearCart();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center border border-[#AF8858]/30">
        <p className="text-2xl mb-2 text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Thank You
        </p>
        <p className="text-sm text-white/50" style={{ fontFamily: "var(--font-body)" }}>
          Our team will be in touch with you shortly.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    color: "rgba(255,255,255,0.85)",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "0px",
    padding: "10px 14px",
    width: "100%",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "10px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "6px",
  };

  const errStyle: React.CSSProperties = {
    color: "#AF8858",
    fontFamily: "var(--font-body)",
    fontSize: "11px",
    marginTop: "4px",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>First Name <span style={{ color: "#AF8858" }}>*</span></label>
          <input {...register("firstName", { required: "Required" })}
            placeholder="Jane" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
          {errors.firstName && <p style={errStyle}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Last Name <span style={{ color: "#AF8858" }}>*</span></label>
          <input {...register("lastName", { required: "Required" })}
            placeholder="Smith" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
          {errors.lastName && <p style={errStyle}>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Email <span style={{ color: "#AF8858" }}>*</span></label>
          <input {...register("email", { required: "Required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
            type="email" placeholder="jane@company.com" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
          {errors.email && <p style={errStyle}>{errors.email.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Phone <span style={{ color: "#AF8858" }}>*</span></label>
          <input {...register("phone", { required: "Required" })}
            type="tel" placeholder="+1 (808) 000-0000" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
          {errors.phone && <p style={errStyle}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Event Date + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Event Date <span style={{ color: "#AF8858" }}>*</span></label>
          <input {...register("eventDate", { required: "Required" })}
            type="date" style={{ ...inputStyle, colorScheme: "dark" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
          {errors.eventDate && <p style={errStyle}>{errors.eventDate.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Event Location</label>
          <input {...register("eventLocation")}
            placeholder="Venue name or address" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
        </div>
      </div>

      {/* Services checkboxes */}
      <div>
        <label style={{ ...labelStyle, marginBottom: "10px" }}>Services Interested In</label>
        <div className="grid grid-cols-2 gap-2">
          {serviceOptions.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={opt.id} {...register("services")}
                className="accent-[#AF8858] w-4 h-4" />
              <span className="text-sm text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Service type */}
      <div>
        <label style={{ ...labelStyle, marginBottom: "10px" }}>
          Service Type <span style={{ color: "#AF8858" }}>*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceTypes.map((st) => (
            <label key={st.id} className="flex items-start gap-3 p-3 cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <input type="radio" value={st.id} {...register("serviceType", { required: "Please select a service type" })}
                className="accent-[#AF8858] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white/80" style={{ fontFamily: "var(--font-body)" }}>
                  {st.label}
                </p>
                <p className="text-xs mt-0.5 text-white/35" style={{ fontFamily: "var(--font-body)" }}>
                  {st.sub}
                </p>
              </div>
            </label>
          ))}
        </div>
        {errors.serviceType && <p style={errStyle}>{errors.serviceType.message}</p>}
      </div>

      {/* Cart summary */}
      {hasCartItems && (
        <div className="border border-[#AF8858]/30 p-4 space-y-2">
          <p style={{ ...labelStyle, marginBottom: 0, color: "#AF8858" }}>
            {fromCart ? "From your cart" : "Inventory in cart"}
          </p>
          <ul className="space-y-1">
            {items.map((line) => (
              <li
                key={line.id}
                className="text-xs text-white/60 flex justify-between gap-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>
                  {line.name} × {line.quantity}
                </span>
                <span className="text-[#AF8858] shrink-0">
                  {lineTotal(line) !== null ? formatMoney(lineTotal(line)!) : "Quote"}
                </span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-white/10">
            <CartQuoteSummary quote={quote} compact />
          </div>
        </div>
      )}

      {/* Order details */}
      <div>
        <label style={labelStyle}>Order Details</label>
        <textarea {...register("orderDetails")} rows={hasCartItems ? 12 : 4}
          placeholder="Please provide details for your event (equipment types, counts, set up and breakdown time, etc.)"
          style={{ ...inputStyle, resize: "none" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
      </div>

      {!compact && (
        <div>
          <label style={labelStyle}>Message</label>
          <textarea {...register("message")} rows={3}
            placeholder="Any additional details or questions..."
            style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#AF8858")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full text-white text-xs uppercase tracking-[0.3em] py-4 bg-[#AF8858] hover:bg-[#C5A070] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
      >
        {submitting ? "Sending…" : "Get Started"}
      </button>
      {submitError && (
        <p style={errStyle} className="text-center">
          {submitError}
        </p>
      )}
    </form>
  );
}
