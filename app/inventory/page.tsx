import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/inventory",
  "Equipment Rentals",
  "Browse luxury event rentals from 1311 Events — furnishings, décor, and essentials for weddings, corporate events, and celebrations in Hawaii."
);

export default function InventoryPage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-[#0D0D0C]">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/home/rentals.jpg"
          alt=""
          fill
          className="object-cover scale-105 blur-2xl brightness-[0.28] saturate-[0.85]"
          sizes={SIZES.hero}
          quality={60}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/85 via-[#0D0D0C]/55 to-[#0D0D0C]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0D0D0C_72%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-24 sm:py-32 text-center">
        <p
          className="text-[10px] uppercase tracking-[0.4em] text-[#AF8858] mb-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Rental Catalog
        </p>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl text-white mb-3 leading-[1.05]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Coming Soon
        </h1>

        <p
          className="text-base sm:text-lg text-white/40 mb-8 italic"
          style={{ fontFamily: "var(--font-script)" }}
        >
          A curated collection of premium event rentals
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px w-12 bg-[#AF8858]/50" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#AF8858]/70" />
          <span className="h-px w-12 bg-[#AF8858]/50" />
        </div>

        <p
          className="text-sm sm:text-base text-white/50 max-w-md mx-auto leading-relaxed mb-12"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We are preparing a refined digital catalog of tents, tables, lighting, linens, and
          specialty rentals. Until then, our team is available to curate your quote personally.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.28em] px-10 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors duration-200"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Request a Quote <ArrowRight size={14} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] px-10 py-3.5 border border-white/20 text-white/70 hover:border-[#AF8858] hover:text-[#AF8858] transition-colors duration-200"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
