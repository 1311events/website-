"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { journalPosts } from "@/lib/journal";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";

export default function JournalListing() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return journalPosts;
    return journalPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <section className="bg-[#0D0D0C] pt-32 pb-14 text-center px-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4" style={{ fontFamily: "var(--font-body)" }}>
          The 13 Eleven Event Journal
        </p>
        <h1 className="text-5xl sm:text-6xl text-white mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Monthly Journal
        </h1>
        <p className="text-sm text-white/45 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)" }}>
          Insights, inspiration, and stories behind elevated events, hospitality, and celebrations in Hawaiʻi.
        </p>
      </section>

      <section className="bg-[#F7F7F4] py-14">
        <div className="max-w-3xl mx-auto px-6 mb-10">
          <label className="relative block">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0D0C]/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by title, category, or topic…"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#D3D3C7] text-sm text-[#0D0D0C] placeholder:text-[#0D0D0C]/35 focus:outline-none focus:border-[#AF8858]"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </label>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group bg-white border border-[#D3D3C7] overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes={SIZES.third} quality={IMAGE_QUALITY} className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#AF8858] mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  {post.category}
                </p>
                <p className="text-base text-[#0D0D0C] leading-snug mb-4 group-hover:text-[#AF8858] transition-colors" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
                  {post.title}
                </p>
                <p className="text-xs text-[#0D0D0C]/55 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#AF8858]" style={{ fontFamily: "var(--font-body)" }}>
                  Read Article <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-[#0D0D0C]/50" style={{ fontFamily: "var(--font-body)" }}>
            No articles match your search.
          </p>
        )}
      </section>
    </>
  );
}
