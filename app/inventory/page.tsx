import Link from "next/link";
import Image from "next/image";
import InventoryCatalog from "@/components/InventoryCatalog";

export const metadata = {
  title: "Inventory — 1311 Events",
  description:
    "Browse our full rental inventory — AV, catering, chairs, tables, tents, lighting, linens, and more.",
};

export default function InventoryPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "50vh", paddingTop: "64px" }}
      >
        <Image
          src="/images/home/rentals.jpg"
          alt="1311 Events rental inventory"
          fill
          className="object-cover brightness-[0.45]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/60 via-[#0D0D0C]/25 to-[#0D0D0C]" />
        <div className="relative z-10 max-w-3xl px-6 py-20">
          <p
            className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Rental Catalog
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Inventory
          </h1>
          <p
            className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Explore our full collection of event rentals — from tents and tables to lighting,
            linens, catering equipment, and more. Pricing listed is per item unless noted.
          </p>
        </div>
      </section>

      <InventoryCatalog />

      {/* CTA */}
      <section className="bg-[#0D0D0C] border-t border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-4xl sm:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Ready to Build Your Event?
          </h2>
          <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Tell us what you need and we&rsquo;ll confirm availability, quantities, and a tailored
            quote for your date.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white text-xs uppercase tracking-[0.3em] px-12 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
