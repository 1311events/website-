export type CaviarTin = {
  id: string;
  label: string;
  grams: number;
  serving: string;
};

export type CaviarProduct = {
  id: string;
  name: string;
  subtitle: string;
  positioning: string;
  ratePerGram: number;
  suggestedRetail: Record<number, string>;
};

export type SeafoodAddon = {
  id: string;
  name: string;
};

export const CAVIAR_ORDER_PATH = "/seafood#order";
export const CAVIAR_ORDER_URL = "https://www.1311events.com/seafood#order";

export const CAVIAR_SALES_RECIPIENTS = [
  "Jordan@1311Events.com",
  "Maryssa@1311Events.com",
] as const;

export const CAVIAR_TINS: CaviarTin[] = [
  { id: "12g-tin", label: "12g Tin", grams: 12, serving: "Single serving / tasting" },
  { id: "30g-jar", label: "30g / 1oz Jar", grams: 30, serving: "2–4 guests" },
  { id: "30g-tin", label: "30g / 1oz Tin", grams: 30, serving: "2–4 guests" },
  { id: "50g-jar", label: "50g / 2oz Jar", grams: 50, serving: "Small gathering" },
  { id: "125g-tin", label: "125g Tin", grams: 125, serving: "Dinner party / VIP hosting" },
  { id: "250g-tin", label: "250g / 7oz Tin", grams: 250, serving: "Event service" },
  { id: "500g-tin", label: "500g Tin", grams: 500, serving: "Large events / restaurant service" },
  { id: "1kg-tin", label: "1kg Tin", grams: 1000, serving: "High-volume hospitality" },
];

export const CAVIAR_PRODUCTS: CaviarProduct[] = [
  {
    id: "imperial-ossetra",
    name: "1311 Events Imperial Ossetra",
    subtitle: "Premium House Selection",
    positioning:
      "The signature house selection. Elegant, approachable, and ideal for restaurant menus, tasting experiences, caviar bumps, and VIP service.",
    ratePerGram: 3,
    suggestedRetail: {
      12: "$75–$120",
      30: "$180–$300",
      50: "$300–$500",
      125: "$750–$1,200",
      250: "$1,500–$2,400",
      500: "$3,000–$5,000",
      1000: "$6,000–$10,000",
    },
  },
  {
    id: "giaveri-ossetra",
    name: "Giaveri Italian Ossetra",
    subtitle: "Refined / Luxury European Selection",
    positioning:
      "Italian in origin, with nutty and buttery notes, olive-oil character, warm bronze-to-olive color, medium pearls, and a firm texture.",
    ratePerGram: 4.5,
    suggestedRetail: {
      12: "$95–$145",
      30: "$250–$400",
      50: "$450–$700",
      125: "$1,100–$1,800",
      250: "$2,200–$3,800",
      500: "$4,500–$7,000",
      1000: "$9,000–$14,000",
    },
  },
  {
    id: "belgian-ossetra",
    name: "Belgian Ossetra",
    subtitle: "Ultra Luxury Selection",
    positioning:
      "Earthy, nutty, creamy, and clean, with silver-to-dark-steel color, medium-plus pearls, and a firm texture.",
    ratePerGram: 5.5,
    suggestedRetail: {
      12: "$120–$180",
      30: "$325–$500",
      50: "$550–$850",
      125: "$1,400–$2,200",
      250: "$2,800–$4,500",
      500: "$5,500–$9,000",
      1000: "$11,000–$18,000",
    },
  },
];

export const SEAFOOD_ADDONS: SeafoodAddon[] = [
  { id: "oysters", name: "Oysters" },
  { id: "king-crab", name: "King Crab" },
  { id: "uni", name: "Uni" },
  { id: "lobster", name: "Lobster" },
  { id: "smoked-salmon", name: "Smoked Salmon" },
  { id: "specialty", name: "Specialty Seafood" },
];

export function wholesalePrice(ratePerGram: number, grams: number) {
  return Math.round(ratePerGram * grams * 100) / 100;
}

export function formatWholesale(amount: number) {
  return amount % 1 === 0
    ? `$${amount.toLocaleString("en-US")}`
    : `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
