import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT || "3000";

/**
 * Railway restarts can leave 0-byte files in `.next/cache/images`, which poisons
 * Next.js's disk LRU and breaks all image optimization for the process lifetime.
 * Wipe the image cache on boot so each container starts clean.
 */
function resetImageCache() {
  const cacheDir = path.join(root, ".next", "cache", "images");
  if (!fs.existsSync(cacheDir)) return;
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log("[start] Cleared .next/cache/images for a clean image cache.");
  } catch (error) {
    console.warn("[start] Could not clear image cache:", error);
  }
}

resetImageCache();

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(
  process.execPath,
  [nextBin, "start", "--hostname", "0.0.0.0", "--port", String(port)],
  { stdio: "inherit", env: process.env, cwd: root }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
