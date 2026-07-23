"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import {
  INVENTORY_CATEGORIES,
  inventoryItems,
  type InventoryItem,
} from "@/data/inventory";
import { formatMoney, itemId, lineTotal, parsePrice, useCart } from "@/components/CartProvider";

export default function InventoryCatalog() {
  const [active, setActive] = useState<(typeof INVENTORY_CATEGORIES)[number]>("All");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { addItem, items, getLineQuantity, updateQuantity, removeItem } = useCart();

  const visible: InventoryItem[] =
    active === "All"
      ? inventoryItems
      : inventoryItems.filter((item) => item.category === active);

  const grouped =
    active === "All"
      ? INVENTORY_CATEGORIES.filter((c) => c !== "All").map((category) => ({
          category,
          items: inventoryItems.filter((item) => item.category === category),
        }))
      : [{ category: active, items: visible }];

  const handleAdd = (item: InventoryItem) => {
    const id = itemId(item);
    addItem(item, 1);
    setJustAdded(id);
    window.setTimeout(() => {
      setJustAdded((current) => (current === id ? null : current));
    }, 1000);
  };

  return (
    <>
      <section className="bg-[#0D0D0C] sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-2 justify-start lg:justify-center">
            {INVENTORY_CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="shrink-0 text-[10px] uppercase tracking-[0.18em] px-4 py-2 transition-colors cursor-pointer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: active === tab ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  borderBottom:
                    active === tab ? "1px solid #AF8858" : "1px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0D0D0C] py-12 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
          {grouped.map(({ category, items: categoryItems }) => (
            <div key={category}>
              <div className="flex items-end justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858] mb-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Category
                  </p>
                  <h2
                    className="text-3xl sm:text-4xl text-white"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                  >
                    {category}
                  </h2>
                </div>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] text-white/35 shrink-0 mb-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {categoryItems.length} items
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                {categoryItems.map((item) => {
                  const id = itemId(item);
                  const qtyInCart = getLineQuantity(item);
                  const inCart = qtyInCart > 0;
                  const added = justAdded === id;
                  const cartLine = items.find((line) => line.id === id);
                  const unit = parsePrice(item.price);
                  const total = cartLine ? lineTotal(cartLine) : null;

                  return (
                    <div
                      key={id}
                      className={`bg-[#0D0D0C] p-6 hover:bg-[#141412] transition-colors flex flex-col ${
                        inCart ? "ring-1 ring-inset ring-[#AF8858]/40" : ""
                      }`}
                    >
                      <h3
                        className="text-lg text-white mb-5 leading-snug min-h-[2.5rem]"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                      >
                        {item.name}
                      </h3>
                      <div className="flex items-end justify-between gap-4 border-t border-[#AF8858]/25 pt-4 mb-5">
                        <div>
                          <p
                            className="text-[9px] uppercase tracking-[0.2em] text-white/35 mb-1"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Price
                          </p>
                          <p
                            className="text-sm text-[#AF8858]"
                            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                          >
                            {item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-[9px] uppercase tracking-[0.2em] text-white/35 mb-1"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Available
                          </p>
                          <p
                            className="text-sm text-white/70"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {item.qty}
                          </p>
                        </div>
                      </div>

                      {inCart ? (
                        <div className="mt-auto space-y-3">
                          {total !== null && unit !== null && (
                            <p
                              className="text-xs text-white/50 text-center"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              Line total:{" "}
                              <span className="text-[#AF8858]">{formatMoney(total)}</span>
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center border border-[#AF8858]/50 flex-1 justify-between">
                              <button
                                type="button"
                                onClick={() =>
                                  qtyInCart <= 1
                                    ? removeItem(id)
                                    : updateQuantity(id, qtyInCart - 1)
                                }
                                className="p-2.5 text-white/70 hover:text-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span
                                className="text-sm text-white tabular-nums"
                                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                              >
                                {qtyInCart}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(id, qtyInCart + 1)}
                                className="p-2.5 text-white/70 hover:text-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleAdd(item)}
                              className={`shrink-0 text-[10px] uppercase tracking-[0.15em] px-3 py-2.5 border transition-colors ${
                                added
                                  ? "border-[#AF8858] bg-[#AF8858] text-white"
                                  : "border-white/20 text-white/70 hover:border-[#AF8858] hover:text-[#AF8858]"
                              }`}
                              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                              aria-label="Add one more"
                            >
                              {added ? <Check size={13} /> : <Plus size={13} />}
                            </button>
                          </div>
                          <p
                            className="text-[9px] uppercase tracking-[0.18em] text-[#AF8858]/80 text-center"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            In cart
                          </p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          className="mt-auto inline-flex items-center justify-center gap-2 w-full text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 border border-white/25 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors"
                          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                        >
                          <Plus size={13} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
