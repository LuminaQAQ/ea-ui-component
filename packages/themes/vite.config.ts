import { defineConfig } from "vite";
import path from "node:path";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dtsPlugin from "vite-plugin-dts";
import {
  createEsbuildOptions,
  createScssOptions,
} from "../../internal/vite-config/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "src");

export default defineConfig({
  esbuild: createEsbuildOptions({ target: "es2020" }),
  plugins: [dtsPlugin({ outDir: "dist/types" })],
  build: {
    lib: {
      entry: {
        controller: resolve(srcDir, "controller.ts"),
        light: resolve(srcDir, "entries/light.entry.ts"),
        dark: resolve(srcDir, "entries/dark.entry.ts"),
        source: resolve(srcDir, "entries/source.entry.ts"),
      },
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
      scss: createScssOptions(resolve(srcDir, "styles")),
    },
  },
});
