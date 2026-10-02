import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CaviarOrderForm from "@/components/CaviarOrderForm";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";
import { pageMetadata } from "@/lib/seo";
import { MEMOIRS_URL, SITE_EMAIL, SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/site";

export const metadata = pageMetadata(
  "/seafood",
  "Order Caviar & Seafood",
  "Request 1311 Events Imperial Ossetra, Giaveri Italian Ossetra, and Belgian Ossetra — wholesale hospitality pricing, tin sizes, and specialty seafood add-ons through Browne Trading Company."
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4">{children}</p>
);

export default function SeafoodPage() {
  return (
    <>
      <section
        className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "78vh", paddingTop: "64px" }}
      >
        <Image
          src="/gallery/caviar/11-DSC08618.jpg"
          alt="1311 Events caviar service"
          fill
          className="object-cover brightness-[0.42]"
          sizes={SIZES.hero}
          quality={IMAGE_QUALITY}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/75 via-[#0D0D0C]/25 to-[#0D0D0C]" />
        <div className="relative z-10 max-w-3xl px-6 py-24">
          <SectionLabel>1311 Events · Browne Trading Company</SectionLabel>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[0.95]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Caviar &amp; Seafood
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed mb-10">
            A private hospitality program for restaurants, chefs, and events in Hawaiʻi. Scan the lookbook QR or request tins below — our team invoices and fulfills.
          </p>
          <a
            href="#order"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] px-10 py-3.5 bg-[#AF8858] text-white hover:bg-[#C5A070]"
          >
            Order Caviar &amp; Seafood
          </a>
        </div>
      </section>

      <section className="bg-[#F7F7F4] py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4">The program</p>
            <h2 className="text-4xl sm:text-5xl text-[#0D0D0C] mb-5 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Wholesale caviar, ordered as simply as a reservation.
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-6" />
            <p className="text-sm text-[#0D0D0C]/65 leading-relaxed mb-4">
              1311 Events is the Hawaiʻi partner for Browne Trading Company. Chefs, private dining rooms, and planners request Imperial Ossetra, Giaveri Italian Ossetra, or Belgian Ossetra by tin — then we confirm availability, invoice, and deliver.
            </p>
            <p className="text-sm text-[#0D0D0C]/65 leading-relaxed">
              This page is an order-request system, not a public checkout. Select tins and quantities, tell us where to send them, and Jordan and Maryssa receive the inquiry immediately.
            </p>
          </div>
          <div className="lg:col-span-5 border border-[#0D0D0C]/10 p-8 bg-white">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#AF8858] mb-5">Contact</p>
            <p className="text-sm text-[#0D0D0C]/80 mb-2">
              <a href={`mailto:${SITE_EMAIL}`} className="hover:text-[#AF8858]">{SITE_EMAIL}</a>
            </p>
            <p className="text-sm text-[#0D0D0C]/80 mb-6">
              <a href={`tel:${SITE_PHONE}`} className="hover:text-[#AF8858]">{SITE_PHONE_DISPLAY}</a>
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#0D0D0C]/40 mb-2">Caviar sales</p>
            <p className="text-sm text-[#0D0D0C]/70">Jordan@1311Events.com</p>
            <p className="text-sm text-[#0D0D0C]/70 mb-6">Maryssa@1311Events.com</p>
            <a href="#qr" className="text-xs uppercase tracking-[0.22em] text-[#AF8858] hover:text-[#0D0D0C]">
              Download lookbook QR codes
            </a>
          </div>
        </div>
      </section>

      <section id="order" className="bg-[#0D0D0C] py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-12">
          <SectionLabel>Hospitality pricing</SectionLabel>
          <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Select tins, then request the order
          </h2>
          <p className="text-sm text-white/50 max-w-2xl">
            Wholesale rates from the 1311 Events hospitality sheet. Suggested restaurant retail is a guide only.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <CaviarOrderForm />
        </div>
      </section>

      <section id="qr" className="bg-[#0D0D0C] py-20 border-t border-white/10 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Printed materials</SectionLabel>
            <h2 className="text-4xl text-white mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              QR codes for the lookbook
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Both codes open this page at the order form. Print the black mark on cream stock, or the gold mark on dark covers, menus, and restaurant presentations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/qr/caviar-order-black.png"
                download
                className="text-xs uppercase tracking-[0.22em] px-6 py-3 border border-white/25 text-white hover:border-[#AF8858]"
              >
                Download black QR
              </a>
              <a
                href="/qr/caviar-order-gold.png"
                download
                className="text-xs uppercase tracking-[0.22em] px-6 py-3 border border-[#AF8858] text-[#AF8858] hover:bg-[#AF8858] hover:text-white"
              >
                Download gold QR
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#F7F7F4] p-6 flex flex-col items-center">
              <Image src="/qr/caviar-order-black.png" alt="Black QR code to order caviar" width={280} height={280} unoptimized />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#0D0D0C]/50 mt-4">Black / cream</p>
            </div>
            <div className="bg-[#141412] border border-[#AF8858]/40 p-6 flex flex-col items-center">
              <Image src="/qr/caviar-order-gold.png" alt="Gold QR code to order caviar" width={280} height={280} unoptimized />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#AF8858] mt-4">Gold / black</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F4] py-16 border-t border-[#D3D3C7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-3">Sister company</p>
            <h2 className="text-3xl text-[#0D0D0C]" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Full-service catering through Memoirs Hawaiʻi
            </h2>
          </div>
          <a
            href={MEMOIRS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-7 py-3 bg-[#0D0D0C] text-white hover:bg-[#AF8858]"
          >
            Visit Memoirs Hawaiʻi <ArrowRight size={13} />
          </a>
        </div>
      </section>
    </>
  );
}
