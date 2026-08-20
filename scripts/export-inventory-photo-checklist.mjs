/**
 * Export inventory-photo-checklist.csv from the photo manifest.
 * Run: node scripts/export-inventory-photo-checklist.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function categorySlug(category) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function itemSlug(name) {
  return name
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Parse inventory item lines from data/inventory.ts without a TS runtime. */
function loadInventoryItems() {
  const source = readFileSync(join(root, "data/inventory.ts"), "utf8");
  const items = [];
  const pattern =
    /\{\s*name:\s*"((?:\\.|[^"\\])*)",\s*price:\s*"((?:\\.|[^"\\])*)",\s*qty:\s*"((?:\\.|[^"\\])*)",\s*category:\s*"((?:\\.|[^"\\])*)"\s*\}/g;

  const unescape = (value) => value.replace(/\\"/g, '"').replace(/\\\\/g, "\\");

  let match;
  while ((match = pattern.exec(source)) !== null) {
    items.push({
      name: unescape(match[1]),
      price: unescape(match[2]),
      qty: unescape(match[3]),
      category: unescape(match[4]),
    });
  }

  return items;
}

const inventoryItems = loadInventoryItems();

const header = [
  "Status",
  "Category",
  "Item Name",
  "Folder",
  "Filename",
  "Disk Path",
  "Public URL",
  "Notes",
].join(",");

const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;

const rows = inventoryItems.map((item) => {
  const folder = categorySlug(item.category);
  const filename = `${itemSlug(item.name)}.jpg`;
  const diskPath = `public/inventory/${folder}/${filename}`;
  const publicPath = `/inventory/${folder}/${filename}`;

  return [
    escape("pending"),
    escape(item.category),
    escape(item.name),
    escape(folder),
    escape(filename),
    escape(diskPath),
    escape(publicPath),
    escape(""),
  ].join(",");
});

const csv = [header, ...rows].join("\n");
const outPath = join(root, "data/inventory-photo-checklist.csv");

writeFileSync(outPath, csv, "utf8");
console.log(`Wrote ${inventoryItems.length} rows to data/inventory-photo-checklist.csv`);
