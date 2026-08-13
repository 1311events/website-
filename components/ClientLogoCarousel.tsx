"use client";

import Image from "next/image";
import { clientLogos, logoImageClassName, logoImageStyle } from "@/lib/clients";
import { IMAGE_QUALITY } from "@/lib/image";

export default function ClientLogoCarousel() {
  return (
    <section className="bg-[#F7F7F4] py-10 border-t border-b border-[#D3D3C7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p
          className="text-center text-[10px] uppercase tracking-[0.35em] mb-7 text-[#0D0D0C]/50"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Clients We&rsquo;ve Served
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-12">
          {clientLogos.map((client) => (
            <div
              key={client.alt}
              className="flex items-center justify-center h-14 px-2"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={client.width}
                height={client.height}
                quality={IMAGE_QUALITY}
                className={logoImageClassName}
                style={logoImageStyle}
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
