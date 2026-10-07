import { defineConfig } from "vite";
import path from "node:path";
import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dtsPlugin from "vite-plugin-dts";
import {
  RESOLVE_EXTENSIONS,
  coreSourceAliases,
  createEsbuildOptions,
  createScssOptions,
} from "../../internal/vite-config/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "src");

const sourceDirs = ["core", "decorator", "utils", "stores"];

const entryConfigs: Record<string, string> = {};
sourceDirs.forEach(dir => {
  const dirPath = resolve(srcDir, dir);
  readdirSync(dirPath).forEach((file: string) => {
    if (!file.endsWith(".ts")) return;
    const filePath = resolve(dirPath, file);
    if (!statSync(filePath).isFile()) return;
    entryConfigs[`${dir}/${file.replace(/\.ts$/, "")}`] = filePath;
  });
});

export default defineConfig({
  esbuild: createEsbuildOptions({ target: "es2020" }),
  plugins: [dtsPlugin({ outDir: "dist/types" })],
  build: {
    lib: {
      entry: entryConfigs,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: createScssOptions(resolve(__dirname, "../themes/src/styles")),
    },
  },
  resolve: {
    extensions: RESOLVE_EXTENSIONS,
    alias: coreSourceAliases(srcDir),
  },
});
