"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";

const featuredEvents = [
  {
    name: "Festa Italiana",
    location: "Honolulu, Hawaiʻi",
    description:
      "A two-day culinary celebration bringing together iconic flavors, world-class talent, and the spirit of Italian hospitality.",
    tags: ["Event Production", "Catering", "Bar Services", "Staffing", "Culinary Experience", "Rentals"],
    image: "/festaitaliam.jpeg",
  },
  {
    name: "Hawaiʻi Food and Wine Festival 2025",
    location: "Oʻahu, Hawaiʻi",
    description:
      "A premier culinary experience bringing together celebrated chefs, local flavors, and elevated hospitality across Hawaiʻi.",
    tags: ["Event Coordination", "Bar Services", "Culinary Experience", "Rentals"],
    image: "/foodfestival.jpeg",
  },
  {
    name: "Diner En Blanc Hawaiʻi 2025",
    location: "Honolulu, Hawaiʻi",
    description:
      "An elegant open-air dining experience in Honolulu, featuring refined cuisine, elevated service, and an unforgettable all-white celebration.",
    tags: ["Catering", "Bar Services", "Staffing", "Culinary Experience", "Rentals"],
    image: "/Diner En Blanc Hawaiʻi 2025.jpeg",
  },
];

const AUTOPLAY_MS = 8000;

export default function FeaturedExperiencesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    setAutoplayEnabled(false);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    setAutoplayEnabled(false);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplayEnabled) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [emblaApi, autoplayEnabled]);

  return (
    <section className="bg-[#0D0D0C] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2
            className="text-4xl sm:text-5xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Featured Experiences
          </h2>
          <p
            className="text-sm text-white/45 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-script)", fontStyle: "italic" }}
          >
            A Collection of Events Designed With Intention, Elevated Through Hospitality, Production, and Execution.
          </p>
        </div>

        <div className="relative">
          {/* Previous */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous featured experience"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 sm:-ml-4 lg:-ml-6 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-[#0D0D0C]/90 text-white/70 hover:text-[#AF8858] hover:border-[#AF8858] transition-colors"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next featured experience"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 sm:-mr-4 lg:-mr-6 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-[#0D0D0C]/90 text-white/70 hover:text-[#AF8858] hover:border-[#AF8858] transition-colors"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          <div className="overflow-hidden mx-8 sm:mx-10 lg:mx-12" ref={emblaRef}>
            <div className="flex">
              {featuredEvents.map((event) => (
                <div key={event.name} className="shrink-0 basis-full min-w-0 px-0.5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10">
                    <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[420px] relative overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        sizes={SIZES.half}
                        quality={IMAGE_QUALITY}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
                      <div>
                        <p
                          className="text-xs uppercase tracking-[0.3em] text-[#AF8858] mb-3"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {event.location}
                        </p>
                        <h3
                          className="text-3xl sm:text-4xl text-white mb-4 leading-tight"
                          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                        >
                          {event.name}
                        </h3>
                        <p
                          className="text-sm text-white/55 leading-relaxed mb-7"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-white/20 text-white/50"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#AF8858] hover:text-[#C5A070] transition-colors"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                      >
                        More Projects <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots + slide counter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <div className="flex justify-center gap-2.5">
            {featuredEvents.map((event, i) => (
              <button
                key={event.name}
                type="button"
                onClick={() => {
                  emblaApi?.scrollTo(i);
                  setAutoplayEnabled(false);
                }}
                aria-label={`Show ${event.name}`}
                aria-current={i === current ? "true" : undefined}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: i === current ? "#AF8858" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35" style={{ fontFamily: "var(--font-body)" }}>
            {current + 1} / {featuredEvents.length}
          </p>
        </div>
      </div>
    </section>
  );
}
