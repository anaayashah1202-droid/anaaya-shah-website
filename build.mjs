import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const htmlPath = join(root, "index.html");
const html = readFileSync(htmlPath, "utf8");

const localReferences = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((ref) => {
    return !(
      ref.startsWith("#") ||
      ref.startsWith("http://") ||
      ref.startsWith("https://") ||
      ref.startsWith("mailto:") ||
      ref.startsWith("tel:") ||
      ref.startsWith("data:")
    );
  })
  .map((ref) => ref.split("#")[0].split("?")[0]);

const missing = [...new Set(localReferences)].filter((ref) => !existsSync(join(root, ref)));

if (missing.length > 0) {
  console.error("Missing local asset references:");
  for (const ref of missing) console.error(`- ${ref}`);
  process.exit(1);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const entry of ["index.html", "styles.css", "script.js", "assets"]) {
  cpSync(join(root, entry), join(dist, entry), { recursive: true });
}

console.log("Build complete: dist/");
