import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InstagramEmbed from "@/components/InstagramEmbed";
import FeaturedExperiencesCarousel from "@/components/FeaturedExperiencesCarousel";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";
import { SITE_URL } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "1311 Events — Thirteen Eleven Events | Hawaii's #1 Event Company",
  description:
    "1311 Events (Thirteen Eleven Events) — Hawaii's largest event rental & production company. Full-service coordination, luxury rentals, catering, bar services, and staffing. Based in Honolulu, HI. Call 808-694-0952.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "1311 Events — Thirteen Eleven Events | Hawaii's #1 Event Company",
    description:
      "Hawaii's largest full-service event rental & production company. Luxury rentals, catering, bar services, staffing, and coordination.",
    images: [{ url: `${SITE_URL}/images/home/hero.jpg`, width: 1200, height: 630, alt: "1311 Events — Thirteen Eleven Events" }],
  },
};

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
    label: "Event Production",
    description: "Experienced event professionals dedicated to providing polished service and seamless guest experiences.",
    href: "/services#production",
    image: "/images/home/professionals.png",
  },
  {
    label: "Equipment Rentals",
    description: "Curated event furnishings, décor, and essentials designed to elevate every celebration with style and sophistication.",
    href: "/inventory",
    image: "/images/home/equipments.png",
  },
  {
    label: "Design & Decor",
    description: "Intentional styling, curated aesthetics, and sophisticated details that transform spaces into unforgettable environments.",
    href: "/services#decor",
    image: "/images/home/designanddecor.jpg",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EventVenue"],
  name: "1311 Events",
  alternateName: "13 Eleven Events",
  url: SITE_URL,
  logo: `${SITE_URL}/images/home/hero.jpg`,
  image: `${SITE_URL}/images/home/hero.jpg`,
  description:
    "1311 Events (13 Eleven Events) is Hawaiʻi's largest full-service event rental and production company, offering coordination, luxury rentals, catering, bar services, and staffing.",
  email: "info@1311events.com",
  telephone: "+1-808-694-0952",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Honolulu",
    addressRegion: "HI",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Hawaii" },
  sameAs: [
    "https://www.instagram.com/1311events/",
    "https://www.1311events.com",
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-17:00",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1311 Events",
  alternateName: "13 Eleven Events",
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-[#0D0D0C] px-6"
        style={{ paddingTop: "80px" }}>
        <Image
          src="/images/home/hero.jpg"
          alt="1311 Events hero"
          fill
          className="object-cover"
          sizes={SIZES.hero}
          quality={IMAGE_QUALITY}
          priority
        />
        <div className="absolute inset-0 bg-[#0D0D0C]/45" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl text-white mb-3 leading-tight italic"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            13 Eleven Events
          </h1>
          <p className="text-sm sm:text-base uppercase tracking-[0.35em] text-[#AF8858] mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
            1311 Events
          </p>
          <p className="text-base sm:text-lg text-white/70 mb-12 italic"
            style={{ fontFamily: "var(--font-script)" }}>
            Your one-stop shop for event services in Hawaiʻi.
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
              <Image src="/images/home/table.PNG" alt="Table setup" fill sizes={SIZES.quarter} quality={IMAGE_QUALITY} className="object-cover" />
            </div>
            <div className="rounded-sm relative overflow-hidden">
              <Image src="/images/home/floral.PNG" alt="Floral arrangement" fill sizes={SIZES.quarter} quality={IMAGE_QUALITY} className="object-cover" />
            </div>
            <div className="rounded-sm relative overflow-hidden">
              <Image src="/images/home/lady.png" alt="Event professional" fill sizes={SIZES.quarter} quality={IMAGE_QUALITY} className="object-cover" />
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
              At 13 Eleven Events, we are a full-service event planning partner by integrating event production, luxury rentals, catering, bar services, staffing, and coordination under one trusted team.
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

      <FeaturedExperiencesCarousel />

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
                  <Image src={svc.image} alt={svc.label} fill sizes={SIZES.third} quality={IMAGE_QUALITY} className="object-cover brightness-[0.65]" />
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
