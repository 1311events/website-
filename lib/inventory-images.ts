import type { InventoryItem } from "@/data/inventory";

export const INVENTORY_PLACEHOLDER = "/images/home/equipments.png";

export function inventoryCategorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function inventoryItemSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Preferred path when photos follow the public/inventory folder convention. */
export function inventoryImagePath(item: InventoryItem) {
  if (item.image) return item.image;

  const category = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);

  return `/inventory/${category}/${slug}.jpg`;
}

export function inventoryImageCandidates(item: InventoryItem) {
  const category = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);
  const base = `/inventory/${category}/${slug}`;

  const candidates = item.image ? [item.image] : [];

  return [...candidates, `${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`];
}
