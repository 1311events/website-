import { MEMOIRS_URL } from "@/lib/site";

export type ServiceSection = {
  id: string;
  num: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: { label: string; href: string; external?: boolean };
};

export const serviceSections: ServiceSection[] = [
  {
    id: "rentals",
    num: "01",
    label: "Equipment Rentals",
    title: "Equipment Rentals",
    description:
      "Premium event rentals curated to elevate every detail. From furniture to essentials, we have everything you need to bring your vision to life.",
    image: "/images/home/rentals.jpg",
    imageAlt: "Equipment rentals",
    cta: { label: "View Catalog", href: "/inventory" },
  },
  {
    id: "production",
    num: "02",
    label: "Event Production",
    title: "Event Production",
    description:
      "Seamless event production from planning to execution. Our experienced team manages timelines, vendors, logistics, and on-site coordination so your event runs flawlessly.",
    image: "/images/home/profservice.jpg",
    imageAlt: "Event production",
    cta: { label: "Inquire Now", href: "/contact" },
  },
  {
    id: "decor",
    num: "03",
    label: "Design & Decor",
    title: "Design & Decor",
    description:
      "Intentional styling, curated aesthetics, and sophisticated details that transform spaces into unforgettable environments. From concept to install, we bring your vision to life.",
    image: "/images/home/designanddecor.jpg",
    imageAlt: "Design and decor",
    cta: { label: "Inquire Now", href: "/contact" },
  },
  {
    id: "catering",
    num: "04",
    label: "Catering & Bar",
    title: "Catering & Bar",
    description:
      "Through our sister company Memoirs Hawaiʻi, we offer fine-dining catering, premium bar services, and staffing for corporate events, weddings, and private celebrations across Oʻahu.",
    image: "/images/home/servcatering.jpg",
    imageAlt: "Catering and bar services",
    cta: { label: "Visit Memoirs Hawaiʻi", href: MEMOIRS_URL, external: true },
  },
  {
    id: "corporate",
    num: "05",
    label: "Corporate & Nonprofit Events",
    title: "Corporate & Nonprofit Events",
    description:
      "Elevated corporate gatherings, galas, conferences, and nonprofit celebrations with full-service coordination, rentals, catering, and on-site support tailored to your brand and goals.",
    image: "/images/home/corporte.jpg",
    imageAlt: "Corporate events",
    cta: { label: "Contact Us", href: "/contact" },
  },
  {
    id: "weddings",
    num: "06",
    label: "Luxury Weddings, Corporate Events & Private Celebrations",
    title: "Luxury Weddings, Corporate Events & Private Celebrations",
    description:
      "From intimate celebrations to large-scale productions, we design and execute weddings, milestone events, and private gatherings with creativity, precision, and aloha.",
    image: "/images/home/weddingservice.jpg",
    imageAlt: "Weddings and private celebrations",
    cta: { label: "Inquire Now", href: "/contact" },
  },
];

export const serviceTiles = serviceSections.map(({ num, label, id, image }) => ({
  num,
  label,
  href: `#${id}`,
  image,
}));
