/** Shared Next.js Image defaults for faster loads */
export const IMAGE_QUALITY = 75;

export const SIZES = {
  hero: "100vw",
  half: "(max-width: 1024px) 100vw, 50vw",
  third: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quarter: "(max-width: 1024px) 50vw, 25vw",
  gallery: "(max-width: 768px) 50vw, 33vw",
  card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px",
} as const;
