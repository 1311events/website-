"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatMoney, lineTotal, useCart } from "@/components/CartProvider";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    itemCount,
    estimatedTotal,
    ready,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  const goToCart = () => {
    closeCart();
    router.push("/cart");
  };

  const goToCheckout = () => {
    closeCart();
    router.push("/contact?from=cart");
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0D0D0C] border-l border-white/10 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858] mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your Cart
            </p>
            <h2
              className="text-2xl text-white"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              {!ready
                ? "…"
                : `${itemCount} ${itemCount === 1 ? "Item" : "Items"}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-white/50 hover:text-white transition-colors p-2"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!ready ? (
            <p
              className="text-sm text-white/40 text-center py-16"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Loading cart…
            </p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={28} className="text-white/25 mb-4" />
              <p
                className="text-sm text-white/45 mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Your cart is empty. Browse inventory to add rentals.
              </p>
              <Link
                href="/inventory"
                onClick={closeCart}
                className="text-[10px] uppercase tracking-[0.25em] text-[#AF8858] hover:text-[#C5A070] transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Browse Inventory
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((line) => {
                const total = lineTotal(line);
                return (
                  <li key={line.id} className="border border-white/10 p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p
                          className="text-[9px] uppercase tracking-[0.2em] text-[#AF8858] mb-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {line.category}
                        </p>
                        <p
                          className="text-base text-white leading-snug"
                          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                        >
                          {line.name}
                        </p>
                        <p
                          className="text-xs text-white/45 mt-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {line.price} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        className="text-white/35 hover:text-white transition-colors p-1"
                        aria-label={`Remove ${line.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-white/15">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          className="p-2 text-white/50 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span
                          className="w-8 text-center text-xs text-white tabular-nums"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          className="p-2 text-white/50 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-sm text-[#AF8858] tabular-nums"
                          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                        >
                          {total !== null ? formatMoney(total) : "Quote"}
                        </p>
                        <p
                          className="text-[9px] text-white/30 mt-0.5"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Avail: {line.availableQty}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {ready && items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-white/40"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Estimated total
              </p>
              <p
                className="text-lg text-white tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                {estimatedTotal !== null ? formatMoney(estimatedTotal) : "On request"}
              </p>
            </div>
            <button
              type="button"
              onClick={goToCart}
              className="block w-full text-center text-white text-[11px] uppercase tracking-[0.25em] px-6 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              View Cart
            </button>
            <button
              type="button"
              onClick={goToCheckout}
              className="block w-full text-center text-[11px] uppercase tracking-[0.25em] px-6 py-3 border border-white/25 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Request Quote
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="block w-full text-center text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors py-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
