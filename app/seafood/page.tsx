import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Seafood Distribution — 1311 Events",
  description: "Premium fresh seafood distribution in Hawaii, sourced and delivered with care.",
};

const PlaceholderImg = ({ className = "", label = "" }: { className?: string; label?: string }) => (
  <div className={`flex items-center justify-center text-xs text-center text-white/15 ${className}`}
    style={{ backgroundColor: "#1a1a18" }}>
    <div><p>[ Photo ]</p>{label && <p className="mt-1 text-[10px]">{label}</p>}</div>
  </div>
);

const offerings = [
  { title: "Fresh Daily Catch", description: "Locally sourced, daily-fresh seafood for restaurants, events, and private clients." },
  { title: "Event Catering Supply", description: "Premium seafood packages tailored to large-scale events with reliable delivery." },
  { title: "Custom Orders", description: "Bespoke sourcing for specialty items, corporate gifting, and unique culinary needs." },
];

export default function SeafoodPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "60vh", paddingTop: "64px" }}>
        <PlaceholderImg className="absolute inset-0 opacity-40" label="Seafood hero photo" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/60 via-transparent to-[#0D0D0C]/80" />
        <div className="relative z-10 max-w-3xl px-6 py-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
            style={{ fontFamily: "var(--font-body)" }}>
            Seafood Distribution
          </p>
          <h1 className="text-5xl sm:text-6xl text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Ocean-Fresh.<br />Delivered with Care.
          </h1>
          <p className="text-sm text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}>
            We partner with Hawaii&rsquo;s finest fishermen to bring premium seafood to your event or establishment—fresh, responsibly sourced, and delivered on time.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-[#0D0D0C] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {offerings.map((item) => (
              <div key={item.title} className="border-t border-[#AF8858]/30 pt-6">
                <div className="w-6 h-px bg-[#AF8858] mb-5" />
                <h3 className="text-xl sm:text-2xl text-white mb-3"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split section */}
      <section className="bg-[#0D0D0C] py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <PlaceholderImg className="aspect-[4/3]" label="Seafood product photo" />
          <div className="flex flex-col justify-center px-10 lg:px-16 py-16">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
              style={{ fontFamily: "var(--font-body)" }}>
              About Our Program
            </p>
            <h2 className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              From the Pacific<br />to Your Table
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-5" />
            <p className="text-sm text-white/55 leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}>
              Our distribution network connects Hawaii&rsquo;s best fishermen directly to events, restaurants, and hospitality providers. We handle sourcing, logistics, and delivery so you can focus on creating exceptional experiences.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors self-start"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              Place an Order <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0C] border-t border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Interested in Partnering?
          </h2>
          <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Reach out to discuss how our seafood distribution program can support your next event or ongoing hospitality needs.
          </p>
          <Link href="/contact"
            className="inline-block text-white text-xs uppercase tracking-[0.3em] px-12 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
