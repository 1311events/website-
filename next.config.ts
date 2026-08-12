import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.39"],
  async redirects() {
    /* Old WordPress URLs → new site (helps Google replace stale results) */
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/about-us/:path*", destination: "/about", permanent: true },
      { source: "/equipment-rentals", destination: "/inventory", permanent: true },
      { source: "/equipment-rentals/", destination: "/inventory", permanent: true },
      { source: "/equipment-rentals/:path*", destination: "/inventory", permanent: true },
      { source: "/labor-services", destination: "/services", permanent: true },
      { source: "/labor-services/", destination: "/services", permanent: true },
      { source: "/labor-services/:path*", destination: "/services", permanent: true },
      { source: "/memoirs", destination: "https://memoirshawaii.com", permanent: true },
      { source: "/memoirs/", destination: "https://memoirshawaii.com", permanent: true },
      { source: "/memoirs/:path*", destination: "https://memoirshawaii.com", permanent: true },
      { source: "/food-beverage", destination: "/seafood", permanent: true },
      { source: "/food-beverage/:path*", destination: "/seafood", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [256, 384, 640, 750, 828],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Cap disk cache to avoid unbounded growth on Railway's ephemeral filesystem.
    maximumDiskCacheSize: 50 * 1024 * 1024,
  },
};

export default nextConfig;
