import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Services — 1311 Events",
  description: "Thoughtful Planning. Flawless Execution. Full-service event solutions in Hawaii.",
};

const PlaceholderImg = ({ className = "", label = "" }: { className?: string; label?: string }) => (
  <div className={`flex items-center justify-center text-xs text-center text-white/15 ${className}`}
    style={{ backgroundColor: "#1a1a18" }}>
    <div><p>[ Photo ]</p>{label && <p className="mt-1 text-[10px]">{label}</p>}</div>
  </div>
);

const tiles = [
  { num: "01", label: "Equipments", href: "#rentals" },
  { num: "02", label: "Professionals", href: "#coordination" },
  { num: "03", label: "Design & Décor", href: "#decor" },
  { num: "04", label: "Catering & Bar", href: "#catering" },
  { num: "05", label: "Corporate / Nonprofit Events", href: "#corporate" },
  { num: "06", label: "Luxury Wedding, Corporate, Birthdays Event", href: "#luxury" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "60vh", paddingTop: "64px" }}>
        <PlaceholderImg className="absolute inset-0 opacity-50" label="Services hero photo" />
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
              <PlaceholderImg className="absolute inset-0" label={`${tile.label} photo`} />
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
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors self-start"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              View Catalog <ArrowRight size={13} />
            </Link>
          </div>
          <PlaceholderImg className="aspect-[4/3]" label="Equipment rentals photo" />
        </div>
      </section>

      {/* ══ 02 PROFESSIONALS ════════════════════════════════════ */}
      <section id="coordination" className="bg-[#0D0D0C] py-20 scroll-mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <PlaceholderImg className="aspect-[4/3] order-2 lg:order-1" label="Event professionals photo" />
          <div className="flex flex-col justify-center py-10 lg:py-0 lg:pl-16 order-1 lg:order-2">
            <p className="text-[10px] text-white/40 mb-3" style={{ fontFamily: "var(--font-body)" }}>02</p>
            <h2 className="text-5xl sm:text-6xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Event<br />Professionals
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-5" />
            <p className="text-sm text-white/55 leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}>
              Our team of experienced coordinators and event managers ensures every detail is handled with precision, professionalism, and aloha from start to finish.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors self-start"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              Book a Call <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 03 DESIGN & DÉCOR ═══════════════════════════════════ */}
      <section id="decor" className="bg-[#0D0D0C] py-20 scroll-mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="flex flex-col justify-center py-10 lg:py-0 lg:pr-16">
            <p className="text-[10px] text-white/40 mb-3" style={{ fontFamily: "var(--font-body)" }}>03</p>
            <h2 className="text-5xl sm:text-6xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Design &<br />Décor
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-5" />
            <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}>
              Intentional styling, curated aesthetics, and sophisticated details that transform spaces into unforgettable environments. From concept to full installation.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                View Lookbook <ArrowRight size={13} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 bg-[#AF8858] hover:bg-[#C5A070] text-white transition-colors"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Book a Call
              </Link>
            </div>
          </div>
          <PlaceholderImg className="aspect-[4/3]" label="Design & Décor photo" />
        </div>
        {/* Inline inquiry */}
        <div className="max-w-2xl mx-auto px-6 lg:px-10 mt-14">
          <div className="border border-white/10 p-8">
            <h3 className="text-2xl text-white mb-1"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Inquire About Design & Décor
            </h3>
            <p className="text-xs text-white/40 mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Tell us about your event and we&rsquo;ll schedule a design consultation.
            </p>
            <ContactForm compact />
          </div>
        </div>
      </section>

      {/* ══ 04 CATERING & BAR ═══════════════════════════════════ */}
      <section id="catering" className="bg-[#0D0D0C] py-20 scroll-mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <PlaceholderImg className="aspect-[4/3] order-2 lg:order-1" label="Catering photo" />
          <div className="flex flex-col justify-center py-10 lg:py-0 lg:pl-16 order-1 lg:order-2">
            <p className="text-[10px] text-white/40 mb-3" style={{ fontFamily: "var(--font-body)" }}>04</p>
            <h2 className="text-5xl sm:text-6xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Catering<br />& Bar
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-5" />
            <p className="text-sm text-white/55 leading-relaxed mb-4 max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}>
              Premium full-service catering, bar, and event staffing from our sister company Memoirs Hawaii—17+ years of culinary excellence across Oʻahu.
            </p>
            <a href="https://memoirshawaii.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 bg-[#AF8858] hover:bg-[#C5A070] text-white transition-colors self-start mt-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              Visit Memoirs Hawaii <ExternalLink size={13} />
            </a>
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
