import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us — 1311 Events",
  description: "Hawaii Based. Mission-Driven. Passionate about Excellence.",
};

const recognizedBy = [
  {
    name: "GoHawaii.com",
    blurb: "1311 Events is an event production company specializing in corporate events and weddings. We have a wide array of rental products from tents, tables and chairs...",
    dark: true,
    logo: <span className="text-2xl font-bold tracking-tight text-[#1C1C24]" style={{ fontFamily: "Georgia, serif" }}>HI</span>,
  },
  {
    name: "WeddingWire",
    blurb: "Based in Kapolei, Hawaii, 1311 Events provides premium wedding catering services and rental needs. This business specializes in creating tailored dining ...",
    dark: false,
    logo: (
      <span className="w-14 h-14 rounded-full bg-[#3AAFA9] flex items-center justify-center text-white text-[8px] font-bold text-center leading-tight uppercase">
        Wedding<br />Wire
      </span>
    ),
  },
  {
    name: "The Knot",
    blurb: "Based in Kapolei, HI, 1311 Events offers catering services for weddings and other special occasions. With their professionalism and high-quality service...",
    dark: false,
    logo: (
      <span className="text-center leading-tight">
        <span className="block text-lg font-bold text-[#1C1C1C] lowercase" style={{ fontFamily: "Georgia, serif" }}>the knot</span>
        <span className="block text-[8px] text-[#1C1C1C]/60">made with <span className="text-pink-500">♥</span></span>
      </span>
    ),
  },
  {
    name: "Hawaii Business Magazine",
    blurb: "1311 Events was founded by Jordan Rabe, whose family built the largest event rental company in Hawaii. Jordan spent his childhood learning ...",
    dark: true,
    logo: <span className="text-2xl font-black text-[#8A9A3B]" style={{ fontFamily: "Georgia, serif" }}>HB</span>,
  },
];

const journalPosts = [
  {
    category: "Weddings",
    title: "Planning a Luxury Wedding in Hawaii: A Guide to Creating an Unforgettable Celebration",
    href: "#",
    image: "/images/home/tablesettignwedjor.jpg",
  },
  {
    category: "Corporate Events",
    title: "Corporate Events in Hawaii: Elevating Business Gatherings Through Hospitality",
    href: "#",
    image: "/images/home/ladywedjor.jpg",
  },
  {
    category: "Event Design",
    title: "Event Rentals That Transform Spaces Into Experiences",
    href: "#",
    image: "/images/home/eventrentalswedjor.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative bg-[#0D0D0C]" style={{ minHeight: "28vh" }}>
        <Image
          src="/images/home/aboutusheader.png"
          alt="About 1311 Events"
          fill
          className="object-cover"
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
          <h2 className="text-4xl sm:text-5xl text-[#0D0D0C] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
            Hawaii-Based.<br />Mission-Driven.<br />Passionate About Excellence.
          </h2>
          <p className="text-sm leading-relaxed text-[#0D0D0C]/65 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}>
            We are a full-service event planning and hospitality company rooted in Hawaii&rsquo;s beauty and culture. Our mission is to deliver exceptional experiences with integrity, creativity, and aloha.
          </p>
        </div>
      </section>

      {/* ══ OUR MISSION & PROMISE (dark split) ══════════════════ */}
      <section className="bg-[#0D0D0C]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left – mission + promise stacked */}
          <div className="px-10 lg:px-16 py-16 lg:py-24 flex flex-col justify-center gap-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-5"
                style={{ fontFamily: "var(--font-body)" }}>
                Our Mission
              </p>
              <p className="text-lg sm:text-xl leading-relaxed text-white/75 max-w-sm"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300, lineHeight: 1.7 }}>
                1311 Events is dedicated to providing superior services and products to create amazing events for people to experience so that God is glorified through our excellence.
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
              <Link href="/services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#AF8858] hover:text-[#C5A070] transition-colors mt-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Our Approach <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          {/* Right – single image */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/home/MissionPromise.jpg"
              alt="1311 Events team at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══ FEATURED & RECOGNIZED BY ════════════════════════════ */}
      <section className="bg-[#F7F7F4] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl sm:text-4xl text-[#0D0D0C] text-center mb-10"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
            Featured & Recognized by:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recognizedBy.map((item) => (
              <div key={item.name}
                className={`rounded-2xl p-7 flex gap-5 items-start shadow-lg ${item.dark ? "bg-[#1C1C24]" : "bg-[#C09B6E]"}`}>
                <div className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center bg-white shadow-md overflow-hidden">
                  {item.logo}
                </div>
                <div>
                  <p className={`text-base font-bold mb-1.5 ${item.dark ? "text-white" : "text-[#1C1C1C]"}`}
                    style={{ fontFamily: "var(--font-body)" }}>
                    {item.name}
                  </p>
                  <p className={`text-xs leading-relaxed ${item.dark ? "text-white/70" : "text-[#1C1C1C]/75"}`}
                    style={{ fontFamily: "var(--font-body)" }}>
                    {item.blurb}{" "}
                    <span className={`cursor-pointer underline underline-offset-2 ${item.dark ? "text-white" : "text-[#1C1C1C]"}`}>
                      Read more
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE 1311 JOURNAL ════════════════════════════════════ */}
      <section className="bg-[#F7F7F4] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl text-[#0D0D0C] mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              The 1311 Journal
            </h2>
            <p className="text-sm text-[#0D0D0C]/50"
              style={{ fontFamily: "var(--font-script)", fontStyle: "italic" }}>
              Insights, inspiration, and stories behind elevated events, hospitality, and celebrations in Hawai&lsquo;i.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {journalPosts.map((post) => (
              <Link key={post.title} href={post.href}
                className="group bg-white border border-[#D3D3C7] overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
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
        </div>
      </section>
    </>
  );
}
