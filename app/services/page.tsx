import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";
import { pageMetadata } from "@/lib/seo";
import { serviceSections, serviceTiles } from "@/lib/services-sections";

export const metadata = pageMetadata(
  "/services",
  "Services",
  "Full-service event solutions in Hawaiʻi — production, design, catering, bar services, and coordination by 13 Eleven Events."
);

function ServiceDetail({
  section,
  reverse,
}: {
  section: (typeof serviceSections)[number];
  reverse: boolean;
}) {
  const CtaIcon = section.cta.external ? ExternalLink : ArrowRight;

  const ctaClass =
    "inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 rounded-full border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors self-start";

  const cta = section.cta.external ? (
    <a
      href={section.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaClass}
      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
    >
      {section.cta.label} <CtaIcon size={13} />
    </a>
  ) : (
    <Link
      href={section.cta.href}
      className={ctaClass}
      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
    >
      {section.cta.label} <CtaIcon size={13} />
    </Link>
  );

  return (
    <section id={section.id} className="bg-[#0D0D0C] py-20 scroll-mt-20 border-t border-white/5">
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="flex flex-col justify-center py-10 lg:py-0 lg:pr-16 lg:pl-0">
          <p className="text-[10px] text-white/40 mb-3" style={{ fontFamily: "var(--font-body)" }}>
            {section.num}
          </p>
          <h2
            className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            {section.title}
          </h2>
          <div className="w-10 h-px bg-[#AF8858] mb-5" />
          <p
            className="text-sm text-white/55 leading-relaxed mb-8 max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {section.description}
          </p>
          {cta}
        </div>
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            sizes={SIZES.half}
            quality={IMAGE_QUALITY}
            className="object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${
              reverse ? "from-transparent via-[#0D0D0C]/25 to-[#0D0D0C]" : "from-[#0D0D0C] via-[#0D0D0C]/25 to-transparent"
            }`}
          />
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section
        className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "60vh", paddingTop: "64px" }}
      >
        <Image
          src="/images/home/event.png"
          alt="13 Eleven Events services"
          fill
          className="object-cover"
          sizes={SIZES.hero}
          quality={IMAGE_QUALITY}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/50 via-transparent to-[#0D0D0C]/70" />
        <div className="relative z-10 max-w-3xl px-6 py-20">
          <p
            className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our Services
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Thoughtful Planning.
            <br />
            Flawless Execution.
          </h1>
          <p className="text-sm text-white/50 max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            From elevated experiences to seamless logistics, our full-service offerings are tailored to bring your
            vision to life in Hawaiʻi.
          </p>
        </div>
      </section>

      <section className="bg-[#0D0D0C] pb-4 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {serviceTiles.map((tile) => (
            <a
              key={tile.num}
              href={tile.href}
              className="group relative aspect-[4/3] overflow-hidden block"
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                sizes={SIZES.third}
                quality={IMAGE_QUALITY}
                className="object-cover brightness-[0.65]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/85 via-transparent to-transparent group-hover:from-[#0D0D0C]/70 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-white/40 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    {tile.num}
                  </p>
                  <p
                    className="text-sm sm:text-base uppercase tracking-wider text-white leading-snug"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {tile.label}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-white/40 group-hover:text-[#AF8858] transition-colors shrink-0 ml-3"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {serviceSections.map((section, index) => (
        <ServiceDetail key={section.id} section={section} reverse={index % 2 === 1} />
      ))}

      <section className="bg-[#0D0D0C] border-t border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Ready to Begin?
          </h2>
          <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Not sure which services you need? Our team will help you build the right package.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white text-xs uppercase tracking-[0.3em] px-12 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
