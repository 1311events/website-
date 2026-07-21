import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Seafood & Caviar — 1311 Events",
  description:
    "Premium caviar and specialty seafood by Browne Trading Company, exclusively available in Hawaii through 1311 Events.",
};

const whyBrowne = [
  {
    title: "Premium Seafood",
    tagline: "Fresh • Traceable • Exceptional",
    description:
      "Browne Trading Company has built its reputation on exceptional seafood, fine caviar, and luxury culinary sourcing.",
  },
  {
    title: "Fine Caviar",
    tagline: "Artisanal • Rare • Refined",
    description:
      "Their collection includes premium caviar, fresh seafood, smoked seafood, shellfish, and chef-driven specialty products.",
  },
  {
    title: "Chef-Trusted Sourcing",
    tagline: "Culinary • Proven • Reliable",
    description: "Trusted by chefs. Known for excellence across fine dining and hospitality.",
  },
  {
    title: "Culinary",
    tagline: "Proven • Reliable",
    description:
      "Chef-focused items such as Maine lobster, bluefin tuna, Ora King salmon, and day-boat scallops.",
  },
];

const caviarCollection = [
  {
    name: "1311 Events Ossetra — Premium Blend",
    positioning:
      "The signature house selection. Elegant, approachable, and ideal for restaurant menus, tasting experiences, caviar bumps, and VIP service.",
    wholesale: "$3.00 / gram",
    firstOrder: "$2.50 / gram",
  },
  {
    name: "Giaveri Osetra — Italian Ossetra",
    positioning:
      "Italian in origin, with nutty and buttery notes, olive oil characteristics, warm bronze-to-olive color, medium pearls, and firm texture.",
    wholesale: "$4.50 / gram",
    firstOrder: "$3.50 / gram",
  },
  {
    name: "Royal Belgian Osetra",
    positioning:
      "Earthy, nutty, creamy, clean, with silver-to-dark-steel color, medium-plus pearls, and firm texture.",
    wholesale: "$5.50 / gram",
    firstOrder: "$4.50 / gram",
  },
];

const pricingRows = [
  {
    caviar: "1311 Events Ossetra Premium Blend",
    price: "$3.00/g",
    bestFor: "Main menu caviar, bumps, tastings, catering",
  },
  {
    caviar: "Giaveri Italian Osetra",
    price: "$4.50/g",
    bestFor: "Elevated chef menus, wine pairings, VIP service",
  },
  {
    caviar: "Royal Belgian Osetra",
    price: "$5.50/g",
    bestFor: "Luxury tasting menus, high-end clientele, premium upsell",
  },
];

const servingGuide = [
  "12g = single tasting tin",
  "30g = 2–4 guests depending on use",
  "50g = 4–6 guests",
  "125g = chef/menu service",
  "250g+ = high-volume restaurant or event use",
];

const tinSizes = [
  { size: "12g tin", detail: "2\" diameter, single serving / tasting size" },
  { size: "30g / 1 oz jar", detail: "1.75\" diameter" },
  { size: "30g / 1 oz tin", detail: "2\" diameter" },
  { size: "50g / 2 oz jar", detail: "2\" diameter" },
  { size: "125g tin", detail: "3\" diameter" },
  { size: "250g / 7 oz tin", detail: "3.5\" diameter" },
  { size: "500g tin", detail: "4.875\" diameter" },
  { size: "1kg tin", detail: "6.5\" diameter" },
];

const menuIdeas = [
  "Caviar bumps for VIP guests",
  "Caviar-topped oysters",
  "Caviar and crème fraîche blinis",
  "Caviar service with champagne",
  "Uni, toro, scallop, or potato pairing",
  "Caviar add-on for tasting menus",
  "Tableside caviar presentation",
  "Private dining upgrades",
  "Holiday and Valentine's Day luxury menus",
];

const seafoodAddons = [
  "Premium caviar",
  "Fresh fish",
  "Shellfish",
  "Smoked seafood",
  "Sushi-grade seafood",
  "Specialty seasonal seafood",
  "Caviar serviceware",
];

const orderDetails = [
  "Restaurant name",
  "Chef / manager contact",
  "Caviar selection",
  "Tin size",
  "Quantity",
  "Total grams",
  "Requested delivery date",
  "Special notes / menu use",
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[10px] uppercase tracking-[0.35em] text-[#AF8858] mb-4"
    style={{ fontFamily: "var(--font-body)" }}
  >
    {children}
  </p>
);

export default function SeafoodPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-[#0D0D0C] flex items-center justify-center text-center"
        style={{ minHeight: "65vh", paddingTop: "64px" }}
      >
        <Image
          src="/gallery/caviar/11-DSC08618.jpg"
          alt="Premium caviar collection"
          fill
          className="object-cover brightness-[0.45]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0C]/70 via-[#0D0D0C]/30 to-[#0D0D0C]/90" />
        <div className="relative z-10 max-w-4xl px-6 py-24">
          <SectionLabel>Seafood &amp; Caviar</SectionLabel>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            The Caviar Collection
          </h1>
          <p
            className="text-sm sm:text-base text-white/55 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Premium Caviar &amp; Seafood by Browne Trading Company, exclusively available in
            Hawaii through 1311 Events.
          </p>
        </div>
      </section>

      {/* Partnership Introduction */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionLabel>Partnership Introduction</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              An Exclusive Culinary Offering for Hawaii&rsquo;s Top Chefs &amp; Restaurants
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-6" />
            <p
              className="text-sm text-white/55 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              1311 Events is proud to offer premium caviar and specialty seafood sourced through
              Browne Trading Company, one of the country&rsquo;s most respected names in fine
              seafood and caviar. Through this partnership, Hawaii restaurants and chefs can
              access a curated selection of luxury caviar and seafood products with personalized
              ordering support through 1311 Events.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/gallery/caviar/14-DSC08655.jpg"
              alt="Caviar service at an event"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Browne Trading */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Why Browne Trading</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Trusted by Chefs. Known for Excellence.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyBrowne.map((item) => (
              <div key={item.title} className="border-t border-[#AF8858]/30 pt-6">
                <div className="w-6 h-px bg-[#AF8858] mb-5" />
                <h3
                  className="text-xl text-white mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] text-[#AF8858] mb-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.tagline}
                </p>
                <p
                  className="text-sm text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Caviar Collection */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionLabel>Featured Caviar Collection</SectionLabel>
          <h2
            className="text-4xl sm:text-5xl text-white mb-12"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Our Signature Caviar Selections
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caviarCollection.map((item) => (
              <div
                key={item.name}
                className="border border-white/10 p-8 flex flex-col"
              >
                <h3
                  className="text-2xl text-white mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Positioning
                </p>
                <p
                  className="text-sm text-white/55 leading-relaxed mb-6 flex-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.positioning}
                </p>
                <div className="border-t border-white/10 pt-5 space-y-2">
                  <p className="text-sm text-white" style={{ fontFamily: "var(--font-body)" }}>
                    Wholesale: <span className="text-[#AF8858]">{item.wholesale}</span>
                  </p>
                  <p className="text-xs text-white/45" style={{ fontFamily: "var(--font-body)" }}>
                    First order: {item.firstOrder}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Sheet */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionLabel>Pricing Sheet</SectionLabel>
          <h2
            className="text-4xl sm:text-5xl text-white mb-10"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Restaurant Wholesale Pricing
          </h2>

          <div className="overflow-x-auto mb-10">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#AF8858]/40">
                  <th
                    className="py-4 pr-6 text-[10px] uppercase tracking-[0.2em] text-[#AF8858] font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Caviar
                  </th>
                  <th
                    className="py-4 pr-6 text-[10px] uppercase tracking-[0.2em] text-[#AF8858] font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Price Per Gram
                  </th>
                  <th
                    className="py-4 text-[10px] uppercase tracking-[0.2em] text-[#AF8858] font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.caviar} className="border-b border-white/10">
                    <td
                      className="py-5 pr-6 text-sm text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {row.caviar}
                    </td>
                    <td
                      className="py-5 pr-6 text-sm text-[#AF8858]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {row.price}
                    </td>
                    <td
                      className="py-5 text-sm text-white/55"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3
                className="text-xl text-white mb-4"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                Optional Serving Guide
              </h3>
              <ul className="space-y-2">
                {servingGuide.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-white/55 flex items-start gap-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="text-[#AF8858] mt-1">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#AF8858]/30 p-6">
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-[#AF8858] mb-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                First Order Pricing
              </p>
              <p
                className="text-sm text-white/60 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                1311 Blend $2.50/gram, Giaveri Osetra $3.50/gram, Royal Belgian Osetra $4.50/gram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tin Sizes */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionLabel>Tin Sizes / Order Options</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl text-white mb-5"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Available Ordering Sizes
            </h2>
            <p
              className="text-sm text-white/50 mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Please select desired caviar, tin size, quantity, and total grams needed.
            </p>
            <ul className="space-y-4">
              {tinSizes.map((item) => (
                <li
                  key={item.size}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-white/10 pb-4"
                >
                  <span
                    className="text-sm text-white shrink-0 sm:w-40"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.size}
                  </span>
                  <span
                    className="text-sm text-white/45"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/gallery/caviar/9-DSC08571.jpg"
              alt="Caviar presentation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* How Restaurants Can Use It */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionLabel>How Restaurants Can Use It</SectionLabel>
          <h2
            className="text-4xl sm:text-5xl text-white mb-10"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Menu Ideas for Chefs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {menuIdeas.map((idea) => (
              <div key={idea} className="flex items-start gap-3">
                <span className="text-[#AF8858] text-xs mt-0.5">◆</span>
                <p className="text-sm text-white/55" style={{ fontFamily: "var(--font-body)" }}>
                  {idea}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Caviar */}
      <section className="bg-[#0D0D0C] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
            <Image
              src="/gallery/caviar/4-DSC08425.jpg"
              alt="Premium seafood"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-10 lg:px-16 py-16">
            <SectionLabel>Browne Trading Seafood Add-Ons</SectionLabel>
            <h2
              className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Beyond Caviar:<br />Premium Seafood Access
            </h2>
            <div className="w-10 h-px bg-[#AF8858] mb-5" />
            <p
              className="text-sm text-white/55 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Browne Trading offers more than caviar, including fine seafood, shellfish, smoked
              seafood, flatfish, sushi-grade selections, and specialty products. Browne also offers
              caviar serviceware including mother-of-pearl spoons, plates, caviar servers, and
              caviar keys.
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-[#AF8858] mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Feature Product Categories
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {seafoodAddons.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/55 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span className="text-[#AF8858]">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="bg-[#0D0D0C] border-t border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <SectionLabel>How to Order</SectionLabel>
              <h2
                className="text-4xl sm:text-5xl text-white mb-5"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                Ordering Through 1311 Events
              </h2>
              <p
                className="text-sm text-white/55 leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Restaurants may place orders directly through the 1311 Events sales team. Our team
                will confirm product availability, tin sizes, delivery timing, and total gram
                quantity. To place an order or schedule a tasting, contact 1311 Events.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] px-6 py-3 border border-white/30 text-white hover:border-[#AF8858] hover:text-[#AF8858] transition-colors"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Place an Order <ArrowRight size={13} />
              </Link>
            </div>
            <div className="border border-white/10 p-8">
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-[#AF8858] mb-5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Order Details Needed
              </p>
              <ul className="space-y-3">
                {orderDetails.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-white/55 flex items-center gap-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AF8858] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0C] border-t border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-4xl sm:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            Ready to Elevate Your Menu?
          </h2>
          <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Contact 1311 Events to discuss caviar selections, wholesale pricing, and delivery for
            your restaurant or event.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white text-xs uppercase tracking-[0.3em] px-12 py-3.5 bg-[#AF8858] hover:bg-[#C5A070] transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
