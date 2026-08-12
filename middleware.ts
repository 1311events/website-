import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * This site does not use Server Actions. Bots and stale clients sometimes POST
 * with a Next-Action header, which causes noisy "Failed to find Server Action"
 * errors in production logs. Reject those requests before Next.js handles them.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  if (host === "1311events.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.1311events.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  if (request.method !== "POST") {
    return NextResponse.next();
  }

  const hasServerActionHeader =
    request.headers.has("next-action") ||
    request.headers.has("Next-Action") ||
    request.headers.has("x-next-action");

  if (hasServerActionHeader) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
