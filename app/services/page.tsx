import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Services — 1311 Events",
  description: "Thoughtful Planning. Flawless Execution. Full-service event solutions in Hawaii.",
};

const tiles = [
  { num: "01", label: "Equipment Rentals", href: "#rentals", image: "/images/home/equipments.jpg" },
  { num: "02", label: "Event Production", href: "/contact", image: "/images/home/profservice.jpg" },
  { num: "03", label: "Design & Decor", href: "/contact", image: "/images/home/designanddecor.jpg" },
  { num: "04", label: "Catering & Bar", href: "/contact", image: "/images/home/servcatering.jpg" },
  { num: "05", label: "Corporate / Nonprofit Events", href: "/contact", image: "/images/home/corporte.jpg" },
  { num: "06", label: "Luxury Wedding, Corporate, Birthdays Event", href: "/contact", image: "/images/home/weddingservice.jpg" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "60vh", paddingTop: "64px" }}>
        <Image
          src="/images/home/event.png"
          alt="1311 Events services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/50 via-transparent to-[#0D0D0C]/70" />
        <div className="relative z-10 max-w-3xl px-6 py-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
            style={{ fontFamily: "var(--font-body)" }}>
            Our Services
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Thoughtful Planning.<br />Flawless Execution.
          </h1>
          <p className="text-sm text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}>
            From elevated experiences to seamless logistics, our full-service offerings are tailored to bring your vision to life in Hawai&lsquo;i.
          </p>
        </div>
      </section>

      {/* ══ 6-TILE SERVICE GRID ═════════════════════════════════ */}
      <section className="bg-[#0D0D0C] pb-4 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {tiles.map((tile) => (
            <Link key={tile.num} href={tile.href}
              className="group relative aspect-[4/3] overflow-hidden block">
              <Image src={tile.image} alt={tile.label} fill className="object-cover brightness-[0.65]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/85 via-transparent to-transparent group-hover:from-[#0D0D0C]/70 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-white/40 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    {tile.num}
                  </p>
                  <p className="text-base uppercase tracking-wider text-white"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
                    {tile.label}
                  </p>
                </div>
                <ArrowRight size={16} className="text-white/40 group-hover:text-[#AF8858] transition-colors shrink-0 ml-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ 01 EQUIPMENT RENTALS ════════════════════════════════ */}
      <section id="rentals" className="bg-[#0D0D0C] py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="flex flex-col justify-center py-10 lg:py-0 lg:pr-16">
            <p className="text-[10px] text-white/40 mb-3" style={{ fontFamily: "var(--font-body)" }}>01</p>
            <h2 className="text-5xl sm:text-6xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Equipment<br />Rentals
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-5" />
            <p className="text-sm text-white/55 leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}>
              Premium event rentals curated to elevate every detail. From furniture to essentials, we have everything you need to bring your vision to life.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 rounded-full border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors self-start"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              View Catalog <ArrowRight size={13} />
            </Link>
          </div>
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image src="/images/home/rentals.jpg" alt="Equipment rentals" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0C] via-[#0D0D0C]/25 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════ */}
      <section className="bg-[#0D0D0C] border-t border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Ready to Begin?
          </h2>
          <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Not sure which services you need? Our team will help you build the right package.
          </p>
          <Link href="/contact"
            className="inline-block text-white text-xs uppercase tracking-[0.3em] px-12 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
