/**
 * Print expected inventory photo paths for all catalog items.
 * Run: node scripts/inventory-image-paths.mjs > inventory-photo-checklist.txt
 */
import { inventoryItems } from "../data/inventory.ts";
import {
  inventoryCategorySlug,
  inventoryItemSlug,
} from "../lib/inventory-images.ts";

for (const item of inventoryItems) {
  const category = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);
  console.log(`public/inventory/${category}/${slug}.jpg\t${item.category}\t${item.name}`);
}
