import fs from "fs";
import path from "path";
import GalleryGrid, { GalleryPhoto } from "@/components/GalleryGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/gallery",
  "Gallery",
  "A curated collection of weddings, corporate events, and luxury celebrations produced by 1311 Events in Hawaii."
);

const CATEGORY_FOLDERS: { folder: string; label: string }[] = [
  { folder: "brand-activities", label: "Brand Activities" },
  { folder: "corporate-events", label: "Corporate Events" },
  { folder: "hospitality-and-bar", label: "Hospitality & Bar" },
  { folder: "luxury-receptions", label: "Luxury Receptions" },
  { folder: "outdoor-events", label: "Outdoor Events" },
  { folder: "private-celebrations", label: "Private Celebrations" },
  { folder: "wedding-events", label: "Wedding Events" },
  { folder: "caviar", label: "Caviar" },
];

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

function loadPhotos(): GalleryPhoto[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const photos: GalleryPhoto[] = [];

  for (const { folder, label } of CATEGORY_FOLDERS) {
    const dir = path.join(galleryDir, folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort();
    for (const file of files) {
      photos.push({ src: `/gallery/${folder}/${file}`, category: label });
    }
  }

  return photos;
}

export default function GalleryPage() {
  const photos = loadPhotos();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0D0D0C] pt-24 pb-12 text-center px-6">
        <p
          className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Our Gallery
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Thoughtfully Designed. Flawlessly Executed.
        </h1>
        <p
          className="text-sm text-white/45 max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Explore a curated collection of events that reflect our commitment to
          excellence, creativity, and unforgettable experiences.
        </p>
      </section>

      <GalleryGrid photos={photos} />
    </>
  );
}
