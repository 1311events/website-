"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatMoney, lineTotal, useCart } from "@/components/CartProvider";

export default function CartPageContent() {
  const router = useRouter();
  const {
    items,
    itemCount,
    estimatedTotal,
    ready,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  if (!ready) {
    return (
      <section className="bg-[#0D0D0C] py-24 text-center px-6">
        <p
          className="text-sm text-white/40"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Loading cart…
        </p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-[#0D0D0C] py-24 text-center px-6">
        <h1
          className="text-4xl sm:text-5xl text-white mb-4"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Your Cart
        </h1>
        <p
          className="text-sm text-white/45 mb-8"
          style={{ fontFamily: "var(--font-body)" }}
        >
          No items yet. Browse the inventory to start building your rental list.
        </p>
        <Link
          href="/inventory"
          className="inline-block text-white text-xs uppercase tracking-[0.3em] px-10 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Browse Inventory
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-[#0D0D0C] py-16 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Rental Selection
            </p>
            <h1
              className="text-4xl sm:text-5xl text-white"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Your Cart
            </h1>
            <p
              className="text-sm text-white/45 mt-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {itemCount} {itemCount === 1 ? "item" : "items"} selected
            </p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors self-start sm:self-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Clear All
          </button>
        </div>

        <ul className="space-y-3 mb-8">
          {items.map((line) => {
            const total = lineTotal(line);
            return (
              <li
                key={line.id}
                className="border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] text-[#AF8858] mb-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {line.category}
                  </p>
                  <p
                    className="text-xl text-white leading-snug"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                  >
                    {line.name}
                  </p>
                  <p
                    className="text-sm text-white/50 mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {line.price} each
                    <span className="text-white/25 mx-2">·</span>
                    Available: {line.availableQty}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center border border-white/15">
                    <button
                      type="button"
                      onClick={() => updateQuantity(line.id, line.quantity - 1)}
                      className="p-2.5 text-white/50 hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      className="w-10 text-center text-sm text-white tabular-nums"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(line.id, line.quantity + 1)}
                      className="p-2.5 text-white/50 hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p
                    className="w-20 text-right text-sm text-[#AF8858] tabular-nums"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                  >
                    {total !== null ? formatMoney(total) : "Quote"}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(line.id)}
                    className="text-white/35 hover:text-white transition-colors p-2"
                    aria-label={`Remove ${line.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border border-white/10 px-6 py-5 mb-10">
          <p
            className="text-[10px] uppercase tracking-[0.25em] text-white/40"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Estimated total
          </p>
          <p
            className="text-2xl text-white tabular-nums"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            {estimatedTotal !== null ? formatMoney(estimatedTotal) : "On request"}
          </p>
        </div>

        <div className="border border-[#AF8858]/30 p-8 text-center">
          <h2
            className="text-2xl sm:text-3xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Request a Quote
          </h2>
          <p
            className="text-sm text-white/50 mb-6 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Send your selected rentals to our team. We&rsquo;ll confirm availability and prepare a
            tailored quote for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => router.push("/contact?from=cart")}
              className="inline-block text-white text-xs uppercase tracking-[0.3em] px-12 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Continue to Contact
            </button>
            <Link
              href="/inventory"
              className="inline-block text-[11px] uppercase tracking-[0.25em] px-8 py-3.5 border border-white/25 text-white/70 hover:border-[#AF8858] hover:text-[#AF8858] transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Keep Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
