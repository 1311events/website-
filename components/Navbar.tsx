"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Venues", href: "/venues" },
  { label: "Seafood Distribution", href: "/seafood" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0D0D0C]/98 shadow-lg" : "bg-[#0D0D0C]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/1311-Logo-Black.png"
            alt="1311 Events"
            width={115}
            height={46}
            className="object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop nav — centered */}
        <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-body)",
                  color: pathname === link.href ? "#AF8858" : "rgba(255,255,255,0.7)",
                  textDecoration: pathname === link.href ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — pill button */}
        <div className="hidden lg:block shrink-0">
          <Link
            href="/contact"
            className="text-[11px] font-medium uppercase tracking-[0.15em] px-5 py-2 rounded-full border border-[#AF8858] text-[#AF8858] hover:bg-[#AF8858] hover:text-white transition-colors duration-150"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white/80 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0D0D0C] border-t border-white/10 px-6 pb-5 pt-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-2 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: pathname === link.href ? "#AF8858" : "rgba(255,255,255,0.75)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Link
                href="/contact"
                className="block text-center text-xs font-medium uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border border-[#AF8858] text-[#AF8858] transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
