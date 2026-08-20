import { inventoryItems } from "@/data/inventory";
import {
  inventoryCategorySlug,
  inventoryItemSlug,
} from "@/lib/inventory-images";

/**
 * Photo slot for each catalog item.
 * Use this file as the source of truth when adding inventory images —
 * every item has one exact folder + filename so photos never get mixed up.
 */
export type InventoryPhotoSlot = {
  /** Catalog category, e.g. "Chairs & Lounge" */
  category: string;
  /** Item name exactly as shown on the site */
  name: string;
  /** Folder under public/inventory/, e.g. "chairs-and-lounge" */
  folder: string;
  /** File to save (lowercase slug + .jpg), e.g. "darkwood-chiavari-chair.jpg" */
  filename: string;
  /** URL path served by the site, e.g. "/inventory/chairs-and-lounge/darkwood-chiavari-chair.jpg" */
  publicPath: string;
  /** Where to put the file in the repo, e.g. "public/inventory/chairs-and-lounge/darkwood-chiavari-chair.jpg" */
  diskPath: string;
  /** Set to "uploaded" after the photo file exists in public/inventory/ */
  status: "pending" | "uploaded";
  /** Optional notes while preparing photos */
  notes?: string;
};

function buildPhotoSlot(
  item: (typeof inventoryItems)[number],
  overrides?: Partial<Pick<InventoryPhotoSlot, "status" | "notes">>
): InventoryPhotoSlot {
  const folder = inventoryCategorySlug(item.category);
  const slug = inventoryItemSlug(item.name);
  const filename = `${slug}.jpg`;

  return {
    category: item.category,
    name: item.name,
    folder,
    filename,
    publicPath: `/inventory/${folder}/${filename}`,
    diskPath: `public/inventory/${folder}/${filename}`,
    status: "pending",
    ...overrides,
  };
}

/** One photo slot per catalog item — 219 total. */
export const inventoryPhotoManifest: InventoryPhotoSlot[] = inventoryItems.map((item) =>
  buildPhotoSlot(item)
);

/** Lookup by exact item name (case-sensitive). */
export function getPhotoSlotByName(name: string) {
  return inventoryPhotoManifest.find((slot) => slot.name === name);
}

/** Lookup by category folder + filename. */
export function getPhotoSlotByFile(folder: string, filename: string) {
  return inventoryPhotoManifest.find(
    (slot) => slot.folder === folder && slot.filename === filename
  );
}

/** Category folders used for inventory photos. */
export const INVENTORY_PHOTO_FOLDERS = [
  ...new Set(inventoryPhotoManifest.map((slot) => slot.folder)),
].sort();
