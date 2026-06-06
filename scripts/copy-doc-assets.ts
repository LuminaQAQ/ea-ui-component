import { cpSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);

const publicDir = resolve(root, "docs/.vitepress/public");
const distDir = resolve(root, "docs/.vitepress/dist");

if (args.includes("--index-css")) {
  const indexCssSrc = resolve(root, "docs/index.css");
  const indexCssDest = resolve(publicDir, "index.css");

  if (existsSync(indexCssSrc)) {
    cpSync(indexCssSrc, indexCssDest);
  }

  const buildDistDir = resolve(root, "dist");
  const publicDistDir = resolve(publicDir, "dist");

  if (existsSync(buildDistDir)) {
    for (const dir of ["css", "components", "themes", "assets"]) {
      const src = resolve(buildDistDir, dir);
      if (existsSync(src)) {
        cpSync(src, resolve(publicDistDir, dir), { recursive: true });
      }
    }
  }
} else {
  if (existsSync(publicDir)) {
    mkdirSync(distDir, { recursive: true });
    cpSync(publicDir, distDir, { recursive: true });
  }
}
