"use client";

import Image from "next/image";
import { useState } from "react";

export default function InstagramEmbed() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section className="bg-[#0D0D0C] pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-8">
        <p
          className="block text-center text-xs uppercase tracking-[0.3em] text-white/40"
          style={{ fontFamily: "var(--font-body)" }}
        >
          @1311events
        </p>
      </div>
      <div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => window.open("https://www.instagram.com/1311events/", "_blank")}
      >
        <Image
          src="/images/home/instagram-feed.png"
          alt="1311 Events Instagram Feed"
          fill
          className="object-cover"
          quality={100}
          sizes="100vw"
          unoptimized
        />
      </div>

      {showTooltip && (
        <div
          className="fixed z-50 pointer-events-none px-4 py-2 text-xs text-white bg-[#0D0D0C] border border-[#AF8858]/50 shadow-lg"
          style={{
            left: pos.x + 14,
            top: pos.y - 36,
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
          }}
        >
          Visit our Instagram
        </div>
      )}
    </section>
  );
}
