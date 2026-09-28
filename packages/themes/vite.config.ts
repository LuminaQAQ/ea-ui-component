import { defineConfig } from "vite";
import path from "node:path";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dtsPlugin from "vite-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "src");

export default defineConfig({
  esbuild: {
    target: "es2020",
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  plugins: [dtsPlugin({ outDir: "dist/types" })],
  build: {
    lib: {
      entry: {
        controller: resolve(srcDir, "controller.ts"),
        light: resolve(srcDir, "light.entry.ts"),
        dark: resolve(srcDir, "dark.entry.ts"),
        source: resolve(srcDir, "source.entry.ts"),
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
      scss: {
        api: "modern-compiler",
        loadPaths: [srcDir],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
});
