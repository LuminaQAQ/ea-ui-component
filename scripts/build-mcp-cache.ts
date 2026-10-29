import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PKG_DIR = resolve(ROOT, "packages/mcp-server");
const DIST_DIR = resolve(PKG_DIR, "dist");
const CACHE_SRC = resolve(PKG_DIR, "src/cache/components-meta.json");
const CACHE_DEST = resolve(DIST_DIR, "cache/components-meta.json");

if (process.argv.includes("--clean")) {
  rmSync(DIST_DIR, { recursive: true, force: true });
} else {
  if (!existsSync(CACHE_SRC)) {
    console.error(`缺少缓存文件：${CACHE_SRC}，请先运行 gen-mcp-cache`);
    process.exit(1);
  }

  mkdirSync(resolve(DIST_DIR, "cache"), { recursive: true });
  cpSync(CACHE_SRC, CACHE_DEST);
}
