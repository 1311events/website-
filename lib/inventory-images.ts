import type { InventoryItem } from "@/data/inventory";
import {
  INVENTORY_CATEGORY_FOLDERS,
  INVENTORY_PHOTO_ROOT,
} from "@/lib/inventory-photos";

export const INVENTORY_PLACEHOLDER = "/images/home/equipments.png";

export function inventoryCategorySlug(category: string) {
  return (
    INVENTORY_CATEGORY_FOLDERS[category] ??
    category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

export function inventoryItemSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** URL path for a catalog item photo under public/images/inventory/ */
export function inventoryImagePath(item: InventoryItem) {
  if (item.image) return item.image;

  const category = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);

  return `${INVENTORY_PHOTO_ROOT}/${category}/${slug}.jpg`;
}

export function inventoryImageCandidates(item: InventoryItem) {
  const category = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);
  const base = `${INVENTORY_PHOTO_ROOT}/${category}/${slug}`;

  const candidates = item.image ? [item.image] : [];

  return [...candidates, `${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`];
}

/** Filesystem path (for scripts) — drop photos here in the repo */
export function inventoryPhotoFilePath(item: InventoryItem, ext = "jpg") {
  const category = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);
  return `public${INVENTORY_PHOTO_ROOT}/${category}/${slug}.${ext}`;
}
