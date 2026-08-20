/**
 * Inventory photos — one folder, your filenames.
 *
 * 1. Drop photos into: public/images/inventory/
 * 2. Name each file however you like (e.g. chiavari-darkwood.jpg)
 * 3. Add a line below: "Catalog item name": "your-filename.jpg"
 */

export const INVENTORY_PHOTO_FOLDER = "/images/inventory";

/** Catalog item name → filename inside public/images/inventory/ */
export const inventoryPhotoFiles: Record<string, string> = {
  // Example:
  // "Darkwood Chiavari Chair": "chiavari-darkwood.jpg",
  // "Speaker Set": "speaker-set.png",
};
