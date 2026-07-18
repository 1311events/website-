export const metadata = {
  title: "Gallery — 1311 Events",
  description: "Thoughtfully Designed. Flawlessly Executed. A curated collection of events by 1311 Events.",
};

const categories = [
  "All",
  "Corporate Events",
  "Luxury Receptions",
  "Brand Activations",
  "Private Celebrations",
  "Outdoor Experiences",
  "Hospitality & Bar",
  "Rentals & Styling",
];

// Masonry grid layout: each item has a span (1 or 2 cols) and aspect ratio
const photos = [
  { id: 1, label: "Leadership Forward — Corporate Event", wide: true },
  { id: 2, label: "Luxury Table Setting", wide: false },
  { id: 3, label: "Product Launch — A New Standard", wide: false },
  { id: 4, label: "Outdoor Evening Celebration", wide: false },
  { id: 5, label: "Cocktail — Bartender", wide: false },
  { id: 6, label: "Lounge Setup", wide: false },
  { id: 7, label: "Furniture Styling", wide: false },
  { id: 8, label: "Event Details", wide: false },
  { id: 9, label: "Decor Installation", wide: false },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0D0D0C] pt-32 pb-14 text-center px-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
          style={{ fontFamily: "var(--font-body)" }}>
          Our Gallery
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-5 leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
          Thoughtfully Designed.<br />Flawlessly Executed.
        </h1>
        <p className="text-sm text-white/45 max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-body)" }}>
          Explore a curated collection of events that reflect our commitment to excellence, creativity, and unforgettable experiences.
        </p>
      </section>

      {/* Filter tabs */}
      <section className="bg-[#0D0D0C] sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto py-3">
            {categories.map((cat, i) => (
              <button key={cat}
                className="shrink-0 text-[10px] uppercase tracking-[0.18em] px-5 py-2 transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: i === 0 ? "#AF8858" : "rgba(255,255,255,0.45)",
                  borderBottom: i === 0 ? "1px solid #AF8858" : "1px solid transparent",
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="bg-[#0D0D0C] py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
            {photos.map((photo) => (
              <div key={photo.id}
                className={`relative overflow-hidden group cursor-pointer ${photo.wide ? "col-span-2 lg:col-span-1" : ""}`}
                style={{ aspectRatio: photo.wide ? "16/9" : "4/3" }}>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/15"
                  style={{ backgroundColor: "#1a1a18" }}>
                  <div className="text-center"><p>[ Photo ]</p><p className="mt-1 text-[10px]">{photo.label}</p></div>
                </div>
                <div className="absolute inset-0 bg-[#0D0D0C]/0 group-hover:bg-[#0D0D0C]/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
