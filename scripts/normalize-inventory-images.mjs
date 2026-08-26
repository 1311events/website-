/**
 * Normalize inventory product photos to consistent 1600×1600 squares.
 * Fits the full original on a cream canvas — no crop — using Lanczos + lossless PNG.
 *
 * Run after adding new photos: node scripts/normalize-inventory-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "public/images/inventory";
const CANVAS = 1600;
const FILL = 0.9;
const BG = { r: 247, g: 247, b: 244 };

async function normalize(file) {
  const inPath = path.join(dir, file);
  const meta = await sharp(inPath, { failOn: "none" }).rotate().metadata();
  const w = meta.width || 1;
  const h = meta.height || 1;
  const maxDim = Math.max(w, h);
  const target = Math.round(CANVAS * FILL);
  const scale = target / maxDim;
  const nw = Math.max(1, Math.round(w * scale));
  const nh = Math.max(1, Math.round(h * scale));

  let pipeline = sharp(inPath, { failOn: "none" })
    .rotate()
    .resize(nw, nh, { fit: "fill", kernel: sharp.kernel.lanczos3 });
  if (scale > 1.05) pipeline = pipeline.sharpen({ sigma: 0.6, m1: 0.4, m2: 0.2 });
  const resized = await pipeline.png().toBuffer();

  await sharp({
    create: { width: CANVAS, height: CANVAS, channels: 3, background: BG },
  })
    .composite([{ input: resized, left: Math.round((CANVAS - nw) / 2), top: Math.round((CANVAS - nh) / 2) }])
    .png({ compressionLevel: 6, adaptiveFiltering: true, palette: false, quality: 100, effort: 10 })
    .toFile(inPath);

  console.log("normalized", file);
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));
for (const file of files) await normalize(file);
console.log("done", files.length);
