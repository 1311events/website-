import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/** Page-level metadata with canonical URL for www.1311events.com */
export function pageMetadata(
  path: string,
  title: string,
  description: string,
  options?: { noIndex?: boolean }
): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    ...(options?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
