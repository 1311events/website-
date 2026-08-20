/**
 * Print where to save each inventory photo (public/images/inventory/...).
 * Run: node scripts/inventory-image-paths.mjs
 */
import { inventoryItems } from "../data/inventory.ts";
import { inventoryPhotoFilePath } from "../lib/inventory-images.ts";

console.log("# Drop inventory photos in public/images/inventory/{category}/\n");

for (const item of inventoryItems) {
  console.log(`${inventoryPhotoFilePath(item)}\t${item.category}\t${item.name}`);
}
