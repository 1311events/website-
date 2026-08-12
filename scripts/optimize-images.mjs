/**
 * Resize and compress large JPEG/PNG assets for faster web delivery.
 * Run: node scripts/optimize-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public");

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const MIN_BYTES = 400_000;

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const stat = fs.statSync(file);
  if (stat.size < MIN_BYTES) return null;

  const meta = await sharp(file).metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;
  const needsCompress = stat.size > MIN_BYTES;

  if (!needsResize && !needsCompress) return null;

  const pipeline = sharp(file).rotate();
  if (needsResize) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const tmp = `${file}.opt.tmp`;

  if (ext === ".png") {
    await pipeline.png({ quality: 85, compressionLevel: 9, effort: 10 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
  }

  const after = fs.statSync(tmp).size;
  if (after >= stat.size * 0.95) {
    fs.unlinkSync(tmp);
    return null;
  }

  fs.renameSync(tmp, file);
  return { file, before: stat.size, after };
}

const targets = [path.join(root, "gallery"), path.join(root, "images")];
const files = targets.flatMap((dir) => (fs.existsSync(dir) ? walk(dir) : []));

let saved = 0;
let count = 0;

for (const file of files) {
  try {
    const result = await optimize(file);
    if (result) {
      count += 1;
      saved += result.before - result.after;
      const name = path.relative(root, result.file);
      console.log(
        `${name}: ${(result.before / 1024 / 1024).toFixed(1)}MB → ${(result.after / 1024 / 1024).toFixed(1)}MB`
      );
    }
  } catch (error) {
    console.error(`Failed ${file}:`, error.message);
  }
}

console.log(`\nOptimized ${count} files, saved ${(saved / 1024 / 1024).toFixed(1)}MB total.`);
