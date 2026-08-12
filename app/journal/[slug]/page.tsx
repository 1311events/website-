import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getJournalPost, journalPosts } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo";
import { IMAGE_QUALITY, SIZES } from "@/lib/image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return pageMetadata(`/journal/${slug}`, post.title, post.excerpt);
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-[#0D0D0C] pt-28 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-3" style={{ fontFamily: "var(--font-body)" }}>
            {post.category}
          </p>
          <h1 className="text-4xl sm:text-5xl text-white max-w-3xl leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            {post.title}
          </h1>
        </div>
      </section>

      <section className="bg-[#F7F7F4] py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <aside>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0D0D0C]/40 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Journal Entries
            </p>
            <ul className="space-y-3">
              {journalPosts.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/journal/${entry.slug}`}
                    className={`block text-sm leading-snug transition-colors ${
                      entry.slug === post.slug ? "text-[#AF8858]" : "text-[#0D0D0C]/65 hover:text-[#AF8858]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/journal"
              className="inline-block mt-6 text-[10px] uppercase tracking-[0.2em] text-[#AF8858]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              ← All Articles
            </Link>
          </aside>

          <article>
            <div className="aspect-[16/9] relative overflow-hidden mb-8">
              <Image src={post.image} alt={post.title} fill sizes={SIZES.half} quality={IMAGE_QUALITY} className="object-cover" />
            </div>
            <div className="space-y-5">
              {post.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-[#0D0D0C]/70" style={{ fontFamily: "var(--font-body)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
