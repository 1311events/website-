"use client";

import { useState } from "react";
import Image from "next/image";

export type GalleryPhoto = {
  src: string;
  category: string;
};

const TABS = [
  "All",
  "Corporate Events",
  "Luxury Receptions",
  "Brand Activities",
  "Private Celebrations",
  "Outdoor Events",
  "Hospitality & Bar",
  "Wedding Events",
  "Caviar",
];

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <>
      {/* Filter tabs */}
      <section className="bg-[#0D0D0C] sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-2 justify-start lg:justify-center">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="shrink-0 text-[10px] uppercase tracking-[0.18em] px-4 py-2 transition-colors cursor-pointer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: active === tab ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  borderBottom:
                    active === tab
                      ? "1px solid #AF8858"
                      : "1px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="bg-[#0D0D0C] py-4 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {visible.length === 0 ? (
            <div className="flex items-center justify-center py-24">
              <p
                className="text-sm text-white/30"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Photos coming soon.
              </p>
            </div>
          ) : (
            <div className="columns-2 lg:columns-3 gap-2 [&>div]:mb-2">
              {visible.map((photo) => (
                <div
                  key={photo.src}
                  className="relative overflow-hidden break-inside-avoid group"
                >
                  <Image
                    src={photo.src}
                    alt={photo.category}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0D0D0C]/0 group-hover:bg-[#0D0D0C]/20 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
