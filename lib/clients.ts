/** Client logos for the homepage carousel (files in /public/images/) */
export const clientLogos = [
  { src: "/images/theritzcarlton.png", alt: "The Ritz-Carlton", width: 3840, height: 2160 },
  { src: "/images/FourSeasonsHotels.png", alt: "Four Seasons Hotels", width: 3840, height: 2160 },
  { src: "/images/HaleKoaHotel.png", alt: "Hale Koa Hotel", width: 373, height: 251 },
  { src: "/images/HawaiiConventionCenter.jpg", alt: "Hawaiʻi Convention Center", width: 512, height: 512 },
  { src: "/images/FestaItaliana.png", alt: "Festa Italiana", width: 400, height: 309 },
  { src: "/images/HawaiiFoodandWineFestival.png", alt: "Hawaiʻi Food and Wine Festival", width: 1200, height: 628 },
  { src: "/images/DinerenBlanc.png", alt: "Diner en Blanc Hawaiʻi", width: 366, height: 41 },
] as const;

/** Shared styles for logo images sized via CSS max-height */
export const logoImageClassName =
  "max-h-12 w-auto max-w-[160px] object-contain object-center opacity-70 hover:opacity-100 transition-opacity";

export const logoImageStyle = { width: "auto", height: "auto", maxHeight: 48 } as const;

/** Site header/footer logo (435×106 source) */
export const SITE_LOGO = {
  src: "/1311-Logo-Black.png",
  width: 435,
  height: 106,
  alt: "1311 Events",
} as const;

export const siteLogoClassName =
  "h-[46px] w-auto object-contain brightness-0 invert";

export const siteLogoStyle = { width: "auto", height: "auto", maxHeight: 46 } as const;
