/**
 * Normalize inventory product photos to consistent 800×800 squares.
 * Trims excess background, scales product to ~72% of canvas, centers on cream bg.
 *
 * Run after adding new photos: node scripts/normalize-inventory-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "public/images/inventory";
const CANVAS = 800;
const MAX_CONTENT = 0.72;
const BG = { r: 247, g: 247, b: 244 };

async function normalize(file: string) {
  const inPath = path.join(dir, file);
  const trimmed = await sharp(inPath).trim({ threshold: 12 }).toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = trimmed.info;
  const maxDim = Math.max(w, h);
  const target = Math.round(CANVAS * MAX_CONTENT);
  const scale = target / maxDim;
  const nw = Math.round(w * scale);
  const nh = Math.round(h * scale);

  const resized = await sharp(trimmed.data).resize(nw, nh, { fit: "inside" }).png().toBuffer();

  await sharp({
    create: { width: CANVAS, height: CANVAS, channels: 3, background: BG },
  })
    .composite([{ input: resized, left: Math.round((CANVAS - nw) / 2), top: Math.round((CANVAS - nh) / 2) }])
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(inPath);

  console.log("normalized", file);
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));
for (const file of files) await normalize(file);
console.log("done", files.length);
