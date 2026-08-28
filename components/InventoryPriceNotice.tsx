"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "inventory-price-notice-seen";

export default function InventoryPriceNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // Ignore storage errors and still show the notice.
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors.
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Dismiss notice"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-price-notice-title"
        className="relative w-full max-w-lg bg-[#0D0D0C] border border-white/10 shadow-2xl px-8 py-10 sm:px-12 sm:py-12 text-center"
      >
        <p
          className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Please Note
        </p>
        <h2
          id="inventory-price-notice-title"
          className="text-4xl sm:text-5xl text-white mb-5 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Under Construction
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-10 bg-[#AF8858]/50" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#AF8858]/70" />
          <span className="h-px w-10 bg-[#AF8858]/50" />
        </div>
        <p
          className="text-sm sm:text-base text-white/55 leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          This page is under construction. The prices listed here are examples only.
          Real, updated pricing will be available soon.
        </p>
        <button
          type="button"
          onClick={close}
          className="inline-block text-white text-[11px] uppercase tracking-[0.28em] px-10 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
