import Link from "next/link";
import Image from "next/image";
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InstagramEmbed from "@/components/InstagramEmbed";
import { ArrowRight } from "lucide-react";

/* ── shared helpers ──────────────────────────────────────── */
const Eyebrow = ({ label, light = true }: { label: string; light?: boolean }) => (
  <p className={`text-[10px] uppercase tracking-[0.35em] mb-3 ${light ? "text-[#AF8858]" : "text-[#AF8858]"}`}
    style={{ fontFamily: "var(--font-body)" }}>
    {label}
  </p>
);

const PlaceholderImg = ({ className = "", label = "Team to provide" }: { className?: string; label?: string }) => (
  <div className={`flex items-center justify-center text-xs text-center text-white/15 ${className}`}
    style={{ backgroundColor: "#1a1a18" }}>
    <div><p>[ Photo ]</p><p className="mt-1 text-[10px]">{label}</p></div>
  </div>
);

/* ── Services data ───────────────────────────────────────── */
const homeServices = [
  {
    label: "Equipments",
    description: "Curated event furnishings, décor, and essentials designed to elevate every celebration with style and sophistication.",
    href: "/services#rentals",
    image: "/images/home/equipments.png",
  },
  {
    label: "Professionals",
    description: "Experienced event professionals dedicated to providing polished service and seamless guest experiences.",
    href: "/services#coordination",
    image: "/images/home/professionals.png",
  },
  {
    label: "Design & Décor",
    description: "Intentional styling, curated aesthetics, and sophisticated details that transform spaces into unforgettable environments.",
    href: "/services#decor",
    image: "/images/home/designanddecor.jpg",
  },
];

/* ── Featured experience tags ───────────────────────────── */
const festaTags = ["Event Production", "Catering", "Bar Services", "Staffing", "Culinary Experience", "Rentals"];

export default function HomePage() {
  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-[#0D0D0C] px-6"
        style={{ paddingTop: "80px" }}>
        <Image
          src="/images/home/hero.jpg"
          alt="1311 Events hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0D0D0C]/45" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl text-white mb-5 leading-tight italic"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            13 Eleven Events
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-12 italic"
            style={{ fontFamily: "var(--font-script)" }}>
            your one-stop shop for event services in Hawaii.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact"
              className="text-xs uppercase tracking-[0.3em] px-14 py-4 bg-white text-[#0D0D0C] hover:bg-white/85 transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              Get Started
            </Link>
            <Link href="/about"
              className="text-xs uppercase tracking-[0.3em] px-14 py-4 bg-white text-[#0D0D0C] hover:bg-white/85 transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 2. HOSPITALITY-DRIVEN ABOUT TEASER ═══════════════════ */}
      <section className="bg-[#F7F7F4] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* 4-photo collage */}
          <div className="grid grid-cols-2 gap-2 h-[480px]">
            <div className="row-span-2 rounded-sm relative overflow-hidden">
              <Image src="/images/home/table.PNG" alt="Table setup" fill className="object-cover" />
            </div>
            <div className="rounded-sm relative overflow-hidden">
              <Image src="/images/home/floral.PNG" alt="Floral arrangement" fill className="object-cover" />
            </div>
            <div className="rounded-sm relative overflow-hidden">
              <Image src="/images/home/lady.png" alt="Event professional" fill className="object-cover" />
            </div>
          </div>
          {/* Text */}
          <div>
            <Eyebrow label="About Us" light={false} />
            <h2 className="text-4xl sm:text-5xl text-[#0D0D0C] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              Hospitality-Driven<br />Event Experiences
            </h2>
            <p className="text-sm leading-relaxed text-[#0D0D0C]/65 mb-8 max-w-md"
              style={{ fontFamily: "var(--font-body)" }}>
              At 1311 Events, we are a full-service event planning partner by integrating event production, luxury rentals, catering, bar services, staffing, and coordination under one trusted team.
            </p>
            <Link href="/about"
              className="inline-block text-xs uppercase tracking-[0.25em] px-7 py-3 border border-[#0D0D0C] text-[#0D0D0C] hover:bg-[#0D0D0C] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 3. CLIENTS WE'VE SERVED ══════════════════════════════ */}
      <ClientLogoCarousel />

      {/* ══ 4. FEATURED EXPERIENCES ══════════════════════════════ */}
      <section className="bg-[#0D0D0C] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl text-white mb-3"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Featured Experiences
            </h2>
            <p className="text-sm text-white/45 max-w-lg mx-auto"
              style={{ fontFamily: "var(--font-script)", fontStyle: "italic" }}>
              a collection of events designed with intention, elevated through hospitality, production, and execution.
            </p>
          </div>

          {/* Featured event card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10">
            <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden">
              <Image src="/images/home/festa.png" alt="Festa Italiana event" fill className="object-cover" />
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#AF8858] mb-3"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Honolulu, Hawaii
                </p>
                <h3 className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                  Festa<br />Italiana
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-7"
                  style={{ fontFamily: "var(--font-body)" }}>
                  A two-day culinary celebration bringing together iconic flavors, world-class talent, and the spirit of Italian hospitality.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {festaTags.map((tag) => (
                    <span key={tag}
                      className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-white/20 text-white/50"
                      style={{ fontFamily: "var(--font-body)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/gallery"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#AF8858] hover:text-[#C5A070] transition-colors"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                More Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. OUR SERVICES (image tile cards) ══════════════════ */}
      <section className="bg-[#0D0D0C] pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-4xl sm:text-5xl text-white mb-10 text-center"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {homeServices.map((svc) => (
              <Link key={svc.label} href={svc.href}
                className="group relative aspect-[3/4] overflow-hidden block">
                {svc.image ? (
                  <Image src={svc.image} alt={svc.label} fill className="object-cover brightness-[0.65]" />
                ) : (
                  <PlaceholderImg className="absolute inset-0" label={`${svc.label} photo`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/90 via-[#0D0D0C]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-lg sm:text-xl text-white mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
                    {svc.label}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {svc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#AF8858] group-hover:gap-2 transition-all"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50 hover:text-[#AF8858] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}>
              View All Services <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 6. TESTIMONIALS ══════════════════════════════════════ */}
      <TestimonialCarousel />

      {/* ══ 7. INSTAGRAM ════════════════════════════════════════ */}
      <InstagramEmbed />
    </>
  );
}
