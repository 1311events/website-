"use client";

import { useState } from "react";
import Image from "next/image";
import type { InventoryItem } from "@/data/inventory";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";
import {
  INVENTORY_PLACEHOLDER,
  inventoryImageCandidates,
} from "@/lib/inventory-images";

export default function InventoryItemImage({ item }: { item: InventoryItem }) {
  const candidates = inventoryImageCandidates(item);
  const [index, setIndex] = useState(0);
  const src = candidates[index] ?? INVENTORY_PLACEHOLDER;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F4] mb-5">
      <div className="absolute inset-0 p-4 sm:p-5">
        <Image
          src={src}
          alt={item.name}
          fill
          className="object-contain"
          sizes={SIZES.third}
          quality={IMAGE_QUALITY}
          onError={() => {
            setIndex((current) => {
              if (current >= candidates.length) return current;
              return current + 1;
            });
          }}
        />
      </div>
      {index >= candidates.length && (
        <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-[#0D0D0C]/80 to-transparent">
          <p
            className="text-[9px] uppercase tracking-[0.18em] text-white/35"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Photo coming soon
          </p>
        </div>
      )}
    </div>
  );
}
