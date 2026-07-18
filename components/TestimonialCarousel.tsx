"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    rating: 4.9,
    quote:
      "I agree that 5 stars is not enough! These guys knocked it out of the park! We had a combo birthday and anniversary celebration which required 2 days of setup. The setup crew were on point and no issue was too big...they got very creative and even had the table saw working. The event itself was remarkable. Everyone and everything was perfect. We basically utilized all of their service offerings from food stations, private bar, canopy, decor, staff, etc... everything was classy and matched our vision/theme perfectly. The food and drinks were well above par and I can't say enough about the staff and how hard they worked.",
    highlight: "We are definitely using this group again in the future!",
    name: "Kelly M.",
  },
  {
    rating: 4.9,
    quote:
      "I can't say enough good things about Jordan and his team at 1311. We worked with 1311 to plan our wedding celebration, and I can't imagine how it would have gone if I didn't. Jordan was so easy to talk to, listened to all of our needs, and put a plan together to make it happen. He guided us through everything from the venue space, to the catering, to the day of coordination.\n\nWe had the event this past weekend, and it went perfectly! The food was incredible, every part of the coordination went off perfectly, and our guests were thrilled!",
    highlight:
      "If you are planning any kind of event, you NEED to contact 1311 events. They're the best, and I highly recommend them!!",
    name: "Adam E.",
  },
  {
    rating: 4.9,
    quote:
      "Jordan Rabe and his team are lifesavers!\n\nI live in New York, but had my wedding in Honolulu, Hawaii. There were tons of logistics and delivery works to be done that I was not expected. One of the rental companies was not professional and could not provide the delivery service. Thanks to 1311 Event Consulting, Jordan and his team helped us ship the chairs, chandeliers, and other wedding-related stuff on time. They even provided a storage service so that I don't need to worry about renting mini storage for that stuff.",
    highlight:
      "All in all, Jordan's quick response, full support, and solid work helped us a lot and made my wedding in Honolulu a wonderful experience.",
    name: "Jackson L.",
  },
  {
    rating: 5.0,
    quote:
      "1311 Events handled our annual corporate gala from start to finish—venue coordination, rentals, catering, and staffing. The team was responsive, detail-oriented, and professional throughout. Our leadership team was thoroughly impressed with how seamless everything felt.",
    highlight: "We've already booked them for next year's event.",
    name: "Corporate Client",
  },
];

function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#AF8858] text-white rounded-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>
          {rating}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#0D0D0C] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2
          className="text-center text-4xl sm:text-5xl mb-3 text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Testimonials
        </h2>
        <div className="w-16 h-px bg-[#AF8858] mx-auto mb-14" />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="shrink-0 basis-full md:basis-1/3 px-2.5"
              >
                <div className="h-full border border-white/15 rounded-xl p-7 flex flex-col bg-[#131311]">
                  <RatingBadge rating={t.rating} />
                  <p
                    className="text-xs leading-relaxed text-white/65 text-center whitespace-pre-line"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t.quote}
                  </p>
                  <p
                    className="text-xs leading-relaxed text-[#AF8858] text-center mt-4 italic font-semibold flex-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t.highlight}
                  </p>
                  <p
                    className="text-xs uppercase tracking-[0.2em] text-white text-center mt-6"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: i === current ? "#AF8858" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
