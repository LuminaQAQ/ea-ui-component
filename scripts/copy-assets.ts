import { mkdirSync, cpSync, existsSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");

const distAssetsDir = resolve(root, "dist/assets");
const distThemesDir = resolve(root, "dist/themes");
const publicDistDir = resolve(root, "docs/.vitepress/public/dist");
const publicAssetsDir = resolve(publicDistDir, "assets");
const publicThemesDir = resolve(publicDistDir, "themes");

mkdirSync(publicAssetsDir, { recursive: true });
mkdirSync(publicThemesDir, { recursive: true });

const iconCssPath = resolve(distAssetsDir, "icon.css");
if (existsSync(iconCssPath)) {
  cpSync(iconCssPath, resolve(publicAssetsDir, "icon.css"));
}

if (existsSync(distThemesDir)) {
  cpSync(distThemesDir, publicThemesDir, { recursive: true });
}
