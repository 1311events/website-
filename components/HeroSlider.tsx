"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

const slides = [
  { label: "Corporate Events" },
  { label: "Private Celebrations" },
  { label: "Luxury Rentals" },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "72vh", minHeight: "480px", maxHeight: "680px" }}
    >
      {/* Embla viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full h-full relative flex items-center justify-center"
              style={{ backgroundColor: "#0D0D0C" }}
            >
              {/* Dark overlay — team to replace div with <Image> */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(13,13,12,0.75) 0%, rgba(13,13,12,0.4) 100%)" }}
              />
              <div
                className="absolute bottom-4 right-6 text-xs uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                [ 1311 photo: {slide.label} ]
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p
          className="text-xs font-medium uppercase tracking-[0.3em] mb-5"
          style={{ color: "#AF8858", fontFamily: "var(--font-body)" }}
        >
          Hawaii&rsquo;s Premier Event Partner
        </p>
        <h1
          className="text-white text-4xl sm:text-6xl uppercase mb-5 max-w-3xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            letterSpacing: "0.12em",
            lineHeight: 1.1,
          }}
        >
          Reimagine what&rsquo;s{" "}
          <span style={{ color: "#AF8858" }}>possible.</span>
        </h1>
        <p
          className="text-base sm:text-lg max-w-xl mb-3 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
        >
          1311 Events offers everything you need—design, coordination,
          rentals, décor, catering and bar services—all in one place.
        </p>
        <p
          className="text-sm max-w-lg mb-9 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-italic)", fontStyle: "italic" }}
        >
          At 1311 Events, we make planning easy by offering design,
          coordination, equipment rentals, décor, catering, bar, and
          staffing—all thoughtfully integrated in one place.
        </p>
        <div className="pointer-events-auto flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="text-white text-xs font-medium uppercase tracking-[0.3em] px-10 py-3.5 transition-colors duration-150"
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "#AF8858",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C5A070")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#AF8858")}
          >
            Get Started
          </Link>
          <Link
            href="/services"
            className="text-xs font-medium uppercase tracking-[0.3em] px-10 py-3.5 border transition-colors duration-150"
            style={{
              fontFamily: "var(--font-body)",
              borderColor: "rgba(255,255,255,0.4)",
              color: "rgba(255,255,255,0.85)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "white";
              (e.currentTarget as HTMLAnchorElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)";
            }}
          >
            Our Services
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className="h-px transition-all duration-300"
            style={{
              width: i === current ? "28px" : "16px",
              backgroundColor: i === current ? "#AF8858" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
