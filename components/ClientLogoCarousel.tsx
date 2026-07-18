"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const clients = [
  "GoHawaii.com",
  "The Knot",
  "Nike",
  "Hawaii Gas",
  "Matson",
  "Farmers Insurance",
  "WeddingWire",
  "Hawaii Business Mag",
  "GoHawaii.com",
  "The Knot",
  "Nike",
  "Hawaii Gas",
];

export default function ClientLogoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });

  const autoScroll = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(autoScroll, 2000);
    return () => clearInterval(timer);
  }, [autoScroll]);

  return (
    <section className="bg-[#F7F7F4] py-10 border-t border-b border-[#D3D3C7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p
          className="text-center text-[10px] uppercase tracking-[0.35em] mb-7 text-[#0D0D0C]/50"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Clients We&rsquo;ve Served
        </p>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8 items-center">
            {clients.map((label, i) => (
              <div key={i} className="shrink-0 min-w-[120px] flex items-center justify-center">
                <span
                  className="text-xs font-medium text-[#0D0D0C]/40 uppercase tracking-wider whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
