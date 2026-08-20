/**
 * Inventory product photos live in public/images/inventory/
 *
 * Folder layout (same pattern as public/images/gallery/):
 *   public/images/inventory/{category}/{item-slug}.jpg
 *
 * Example:
 *   Darkwood Chiavari Chair → public/images/inventory/chairs-and-lounge/darkwood-chiavari-chair.jpg
 *   Speaker Set             → public/images/inventory/av-equipment/speaker-set.jpg
 *
 * Supported extensions: .jpg, .jpeg, .png, .webp
 * Optional override per item: set `image` on an entry in data/inventory.ts
 */

export const INVENTORY_PHOTO_ROOT = "/images/inventory";

export const INVENTORY_PHOTO_CATEGORIES = [
  "av-equipment",
  "stage-and-power",
  "bar-equipment",
  "catering-equipment",
  "chairs-and-lounge",
  "dishware-and-glassware",
  "flooring",
  "lighting",
  "linens",
  "tables",
  "decor-and-structures",
  "tents",
] as const;

export type InventoryPhotoCategory = (typeof INVENTORY_PHOTO_CATEGORIES)[number];

/** Maps catalog category names → public/images/inventory subfolder */
export const INVENTORY_CATEGORY_FOLDERS: Record<string, InventoryPhotoCategory> = {
  "AV Equipment": "av-equipment",
  "Stage & Power": "stage-and-power",
  "Bar Equipment": "bar-equipment",
  "Catering Equipment": "catering-equipment",
  "Chairs & Lounge": "chairs-and-lounge",
  "Dishware & Glassware": "dishware-and-glassware",
  Flooring: "flooring",
  Lighting: "lighting",
  Linens: "linens",
  Tables: "tables",
  "Decor & Structures": "decor-and-structures",
  Tents: "tents",
};
