import type { InventoryItem } from "@/data/inventory";
import {
  INVENTORY_PHOTO_FOLDER,
  inventoryPhotoFiles,
} from "@/data/inventory-photos";

export const INVENTORY_PLACEHOLDER = "/images/home/equipments.png";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

function photoUrl(filename: string) {
  return `${INVENTORY_PHOTO_FOLDER}/${filename}`;
}

function extensionVariants(filename: string) {
  const dot = filename.lastIndexOf(".");
  const base = dot > 0 ? filename.slice(0, dot) : filename;
  return EXTENSIONS.map((ext) => photoUrl(`${base}${ext}`));
}

export function inventoryImageCandidates(item: InventoryItem) {
  const candidates: string[] = [];

  if (item.image) {
    candidates.push(item.image);
  }

  const mapped = inventoryPhotoFiles[item.name];
  if (mapped) {
    if (mapped.includes(".")) {
      candidates.push(photoUrl(mapped));
    } else {
      candidates.push(...EXTENSIONS.map((ext) => photoUrl(`${mapped}${ext}`)));
    }
  }

  return candidates;
}

export function inventoryImagePath(item: InventoryItem) {
  const candidates = inventoryImageCandidates(item);
  return candidates[0] ?? INVENTORY_PLACEHOLDER;
}
