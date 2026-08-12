export type JournalPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  body: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "planning-a-luxury-wedding-in-hawaii",
    category: "Weddings",
    title: "Planning a Luxury Wedding in Hawaii: A Guide to Creating an Unforgettable Celebration",
    excerpt:
      "From venue selection to catering and rentals, here's how to design a refined wedding experience in Hawaiʻi.",
    image: "/images/home/tablesettignwedjor.jpg",
    publishedAt: "2026-01-15",
    body: [
      "Hawaiʻi offers an extraordinary backdrop for luxury weddings — ocean views, warm hospitality, and a sense of place that guests remember long after the celebration ends.",
      "At 13 Eleven Events, we partner with couples to integrate production, rentals, catering, bar services, and on-site coordination under one trusted team. That means fewer vendors to manage and a smoother path from vision to execution.",
      "Start with your guest experience: define the flow from arrival to farewell, then build your design, menu, and service plan around it. Whether you're planning an intimate ceremony or a multi-day celebration, thoughtful planning and local expertise make all the difference.",
    ],
  },
  {
    slug: "corporate-events-in-hawaii",
    category: "Corporate Events",
    title: "Corporate Events in Hawaii: Elevating Business Gatherings Through Hospitality",
    excerpt:
      "How thoughtful production and hospitality transform corporate conferences, galas, and retreats in Hawaiʻi.",
    image: "/images/home/ladywedjor.jpg",
    publishedAt: "2026-02-01",
    body: [
      "Corporate events in Hawaiʻi demand precision — tight timelines, brand standards, and guest experiences that feel both polished and welcoming.",
      "13 Eleven Events supports corporations and nonprofits with full-service coordination, premium rentals, catering partnerships through Memoirs Hawaiʻi, bar services, and experienced on-site staff.",
      "From executive dinners to large-scale galas, our team handles logistics so your leadership can focus on connection, content, and outcomes.",
    ],
  },
  {
    slug: "event-rentals-that-transform-spaces",
    category: "Event Design",
    title: "Event Rentals That Transform Spaces Into Experiences",
    excerpt:
      "Curated furnishings and décor elevate every detail — and simplify planning when rentals are handled by one team.",
    image: "/images/home/eventrentalswedjor.jpg",
    publishedAt: "2026-02-20",
    body: [
      "The right rentals do more than fill a room — they set tone, guide guest flow, and bring a creative vision to life.",
      "Our equipment rental catalog includes furnishings, tabletop, décor, and essentials curated for weddings, corporate events, and private celebrations across Oʻahu and beyond.",
      "Browse our inventory online and submit a quote request — our team will confirm availability, delivery, setup, and breakdown so your event runs seamlessly.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
