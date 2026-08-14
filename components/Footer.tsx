"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_LOGO, siteLogoClassName, siteLogoStyle } from "@/lib/clients";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Equipment Rentals", href: "/inventory" },
  { label: "Gallery", href: "/gallery" },
  { label: "Food & Beverage", href: "/seafood" },
  { label: "Journal", href: "/journal" },
  { label: "Cart", href: "/cart" },
  { label: "Contact", href: "/contact" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0C] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src={SITE_LOGO.src}
                alt={SITE_LOGO.alt}
                width={SITE_LOGO.width}
                height={SITE_LOGO.height}
                className={siteLogoClassName}
                style={siteLogoStyle}
              />
            </Link>
            <p className="text-xs text-white/40 leading-relaxed max-w-[220px]"
              style={{ fontFamily: "var(--font-body)" }}>
              Thirteen Eleven Events — Your one-stop shop for event services in Hawaiʻi.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com/1311events" target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-[#AF8858] transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-4"
              style={{ fontFamily: "var(--font-body)" }}>
              Quick Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-xs text-white/50 hover:text-[#AF8858] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-4"
              style={{ fontFamily: "var(--font-body)" }}>
              Get in Touch
            </p>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                  Kapolei, Hawaiʻi
                </p>
              </li>
              <li>
                <a href="tel:+18086940952" className="text-xs text-white/50 hover:text-[#AF8858] transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}>
                  (808) 694-0952
                </a>
              </li>
              <li>
                <a href="mailto:info@1311events.com" className="text-xs text-white/50 hover:text-[#AF8858] transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}>
                  info@1311events.com
                </a>
              </li>
            </ul>
            <div className="mt-7">
              <Link href="/contact"
                className="text-[10px] uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-[#AF8858] text-[#AF8858] hover:bg-[#AF8858] hover:text-white transition-colors inline-block"
                style={{ fontFamily: "var(--font-body)" }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/25" style={{ fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} 1311 Events LLC. All rights reserved.
          </p>
          <p className="text-[10px] text-white/25" style={{ fontFamily: "var(--font-body)" }}>
            Kapolei, Hawaiʻi
          </p>
        </div>
      </div>
    </footer>
  );
}
