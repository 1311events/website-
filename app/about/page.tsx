import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";
import { pageMetadata } from "@/lib/seo";
import { journalPosts } from "@/lib/journal";

export const metadata = pageMetadata(
  "/about",
  "Our Story",
  "Meet the team behind 13 Eleven Events — a Hawaiʻi-based, full-service event and hospitality company founded by Jordan Rabe."
);

export default function AboutPage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative bg-[#0D0D0C]" style={{ minHeight: "28vh" }}>
        <Image
          src="/images/home/aboutusheader.png"
          alt="About 13 Eleven Events"
          fill
          className="object-cover"
          sizes={SIZES.hero}
          quality={IMAGE_QUALITY}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-[#0D0D0C]/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full min-h-[28vh] pb-10 text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-3"
            style={{ fontFamily: "var(--font-body)" }}>
            About Us
          </p>
          <h1 className="text-5xl sm:text-6xl text-white"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Our Story
          </h1>
        </div>
      </section>

      {/* ══ MISSION INTRO ═══════════════════════════════════════ */}
      <section className="bg-[#F7F7F4] py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-4xl sm:text-5xl text-[#0D0D0C] mb-8 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
            Hawaiʻi-Based. Full-Service Event &amp; Hospitality Company.
          </h2>
          <div className="space-y-5 text-sm leading-relaxed text-[#0D0D0C]/65 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}>
            <p>
              At 13 Eleven Events, we create exceptional event experiences through expert planning, premium rentals, hospitality, and seamless execution. Based in Hawaiʻi, we partner with corporations, venues, private clients, and event professionals to bring every vision to life with creativity, precision, and aloha.
            </p>
            <p>
              Our services extend beyond traditional event planning. From luxury rentals and event design to staffing, logistics, catering, and on-site coordination, we provide comprehensive solutions that simplify the planning process while delivering unforgettable experiences.
            </p>
            <p>
              Whether we&rsquo;re supporting a corporate conference, luxury wedding, private celebration, nonprofit gala, or large-scale production, our commitment remains the same: exceptional service, thoughtful collaboration, and flawless execution from beginning to end.
            </p>
          </div>
        </div>
      </section>

      {/* ══ OUR MISSION & PROMISE (dark split) ══════════════════ */}
      <section className="bg-[#0D0D0C]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-10 lg:px-16 py-16 lg:py-24 flex flex-col justify-center gap-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-5"
                style={{ fontFamily: "var(--font-body)" }}>
                Our Mission
              </p>
              <p className="text-lg sm:text-xl leading-relaxed text-white/75 max-w-sm"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300, lineHeight: 1.7 }}>
                13 Eleven Events is dedicated to providing superior services and products to create amazing events for people to experience so that God is glorified through our excellence.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-5"
                style={{ fontFamily: "var(--font-body)" }}>
                Our Promise
              </p>
              <h2 className="text-4xl sm:text-5xl text-white mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                We Help Curate Unforgettable Moments
              </h2>
              <p className="text-sm leading-relaxed text-white/55 mb-4 max-w-sm"
                style={{ fontFamily: "var(--font-body)" }}>
                Every detail matters. Every experience is intentional. We partner with you to design and execute events that leave a lasting impression—beautifully, seamlessly, and meaningfully.
              </p>
            </div>
          </div>
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/home/rentals.jpg"
              alt="13 Eleven Events luxury event rentals and equipment"
              fill
              className="object-cover"
              sizes={SIZES.half}
              quality={IMAGE_QUALITY}
            />
          </div>
        </div>
      </section>

      {/* ══ THE 13 ELEVEN EVENT JOURNAL ═════════════════════════ */}
      <section className="bg-[#F7F7F4] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl text-[#0D0D0C] mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              The 13 Eleven Event Journal
            </h2>
            <p className="text-sm text-[#0D0D0C]/50"
              style={{ fontFamily: "var(--font-script)", fontStyle: "italic" }}>
              Insights, inspiration, and stories behind elevated events, hospitality, and celebrations in Hawaiʻi.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {journalPosts.map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`}
                className="group bg-white border border-[#D3D3C7] overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image src={post.image} alt={post.title} fill sizes={SIZES.third} quality={IMAGE_QUALITY} className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#AF8858] mb-2"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {post.category}
                  </p>
                  <p className="text-base text-[#0D0D0C] leading-snug mb-4 group-hover:text-[#AF8858] transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
                    {post.title}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#AF8858]"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Read Article <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#AF8858] hover:text-[#C5A070] transition-colors"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
              View All Articles <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
