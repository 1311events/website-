import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Venues — 1311 Events",
  description: "Curated Spaces. Elevated Experiences. Premier event venues in Hawaii and beyond.",
};

const venues = [
  {
    num: "01",
    name: "Briggs Brothers Ranch",
    location: "Tennessee, U.S.A",
    description:
      "A breathtaking countryside venue surrounded by rolling landscapes, perfect for luxury weddings, private retreats, and intimate celebrations.",
    cta: "Visit Website",
    href: "https://www.briggsbrothersranch.com/",
    external: true,
    image: "/ranch.png",
    imageAlt: "Briggs Brothers Ranch",
  },
  {
    num: "02",
    name: "Indoor Event at Kapolei",
    location: "Kapolei, Hawai\u02BBi",
    description:
      "An elegant indoor event space designed for upscale corporate functions, private receptions, galas, and exclusive experiences.",
    cta: "View Space",
    href: "/contact",
    external: false,
    image: null,
    imageAlt: "Indoor Event at Kapolei",
  },
];

const PlaceholderImg = ({ className = "", label = "" }: { className?: string; label?: string }) => (
  <div
    className={`flex items-center justify-center text-xs text-center text-white/15 ${className}`}
    style={{ backgroundColor: "#1a1a18" }}
  >
    <div>
      <p>[ Photo ]</p>
      {label && <p className="mt-1 text-[10px]">{label}</p>}
    </div>
  </div>
);

function VenueCard({ venue }: { venue: (typeof venues)[number] }) {
  const content = (
    <>
      {venue.image ? (
        <Image
          src={venue.image}
          alt={venue.imageAlt}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <PlaceholderImg className="absolute inset-0" label={`${venue.name} photo`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/90 via-[#0D0D0C]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-[10px] text-white/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
          {venue.num}
        </p>
        <h2
          className="text-3xl sm:text-4xl text-white mb-1 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          {venue.name}
        </h2>
        <p
          className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {venue.location}
        </p>
        <p
          className="text-sm text-white/55 leading-relaxed mb-6 max-w-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {venue.description}
        </p>
        <span
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-6 py-3 border border-white/30 text-white group-hover:border-[#AF8858] group-hover:text-[#AF8858] transition-colors"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {venue.cta}{" "}
          {venue.external ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
        </span>
      </div>
    </>
  );

  if (venue.external) {
    return (
      <a
        href={venue.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group overflow-hidden block cursor-pointer"
        style={{ minHeight: "520px" }}
        aria-label={`Visit ${venue.name} website`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="relative group overflow-hidden" style={{ minHeight: "520px" }}>
      {venue.image ? (
        <Image src={venue.image} alt={venue.imageAlt} fill className="object-cover" />
      ) : (
        <PlaceholderImg className="absolute inset-0" label={`${venue.name} photo`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/90 via-[#0D0D0C]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-[10px] text-white/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
          {venue.num}
        </p>
        <h2
          className="text-3xl sm:text-4xl text-white mb-1 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          {venue.name}
        </h2>
        <p
          className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {venue.location}
        </p>
        <p
          className="text-sm text-white/55 leading-relaxed mb-6 max-w-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {venue.description}
        </p>
        <Link
          href={venue.href}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-6 py-3 border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {venue.cta} <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function VenuesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0D0D0C] pt-32 pb-14 text-center px-6">
        <p
          className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Our Venues
        </p>
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl text-white mb-5 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Curated Spaces.
          <br />
          Elevated Experiences.
        </h1>
        <p className="text-sm text-white/45 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)" }}>
          From scenic countryside retreats to sophisticated indoor venues, discover spaces designed to host
          unforgettable celebrations and refined corporate gatherings.
        </p>
      </section>

      {/* Venue cards — full-bleed side by side */}
      <section className="bg-[#0D0D0C] pb-4 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-1">
          {venues.map((venue) => (
            <VenueCard key={venue.num} venue={venue} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0C] border-t border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
          <h2
            className="text-4xl sm:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Bring Your Vision to Life
          </h2>
          <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Reach out to discuss available dates, capacity, and how we can pair the perfect venue with our full
            suite of event services.
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
