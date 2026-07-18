import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const metadata = {
  title: "Contact — 1311 Events",
  description: "Get in touch with the 1311 Events team to start planning your event in Hawaii.",
};

const PlaceholderImg = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center text-xs text-white/15 ${className}`}
    style={{ backgroundColor: "#1a1a18" }}>
    <p>[ Photo ]</p>
  </div>
);

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "50vh", paddingTop: "64px" }}>
        <PlaceholderImg className="absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/60 via-transparent to-[#0D0D0C]/80" />
        <div className="relative z-10 max-w-2xl px-6 py-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
            style={{ fontFamily: "var(--font-body)" }}>
            Let&rsquo;s Connect
          </p>
          <h1 className="text-5xl sm:text-6xl text-white mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Get in Touch
          </h1>
          <p className="text-sm text-white/50"
            style={{ fontFamily: "var(--font-body)" }}>
            Whether you&rsquo;re planning your first event or your hundredth, we&rsquo;re here to help. Reach out and let&rsquo;s create something unforgettable.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#0D0D0C] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info — 2/5 */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl text-white mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Contact Information
            </h2>
            <div className="w-8 h-px bg-[#AF8858] mb-8" />
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#AF8858]" />
                <div>
                  <p className="text-sm text-white" style={{ fontFamily: "var(--font-body)" }}>
                    Kapolei, Hawaiʻi
                  </p>
                  <p className="text-xs text-white/45 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                    Serving all of Oʻahu and beyond
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#AF8858]" />
                <div>
                  <a href="tel:+18082309090" className="text-sm text-white hover:text-[#AF8858] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}>
                    (808) 230-9090
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#AF8858]" />
                <div>
                  <a href="mailto:info@1311events.com" className="text-sm text-white hover:text-[#AF8858] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}>
                    info@1311events.com
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-0.5 shrink-0 text-[#AF8858]"><InstagramIcon /></span>
                <div>
                  <a href="https://instagram.com/1311events" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-white hover:text-[#AF8858] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}>
                    @1311events
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3"
                style={{ fontFamily: "var(--font-body)" }}>
                Business Hours
              </p>
              <p className="text-sm text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                Monday – Friday: 9 AM – 6 PM HST
              </p>
              <p className="text-sm text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                Saturday: 10 AM – 3 PM HST
              </p>
              <p className="text-sm text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Form — 3/5 */}
          <div className="lg:col-span-3">
            <div className="border border-white/10 p-8">
              <h2 className="text-3xl sm:text-4xl text-white mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                Send Us a Message
              </h2>
              <p className="text-xs text-white/40 mb-7" style={{ fontFamily: "var(--font-body)" }}>
                We typically respond within one business day.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
