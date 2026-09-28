import { defineConfig, normalizePath } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import entryConfigs from "./configs/entryConfig.ts";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dtsPlugin from "vite-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themesSrcDir = resolve(__dirname, "../themes/src");

export default defineConfig({
  esbuild: {
    target: "es2020",
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  plugins: [
    process.env.REPORT &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html",
      }),
    dtsPlugin({ outDir: "dist/types" }),
  ].filter(Boolean),
  build: {
    lib: {
      entry: entryConfigs,
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^@easy-component-ui\//],
      output: {
        entryFileNames: chunkInfo => {
          if (chunkInfo.name.startsWith("themes/")) {
            return `${chunkInfo.name}.js`;
          }
          if (chunkInfo.name === "theme") {
            return `themes/controller.js`;
          }
          return "components/[name].js";
        },
        chunkFileNames: chunkInfo => {
          if (chunkInfo.name.startsWith("css/")) {
            return `${chunkInfo.name}.style.js`;
          }

          return `components/[name].js`;
        },
        assetFileNames: "assets/icon.css",
        manualChunks(id) {
          const commonPath = normalizePath(
            path.resolve(__dirname, "src/common")
          );
          const componentsPath = normalizePath(
            path.resolve(__dirname, "src/components")
          );
          const normalizedId = normalizePath(id);
          /**
           * @param {Array<string>} pathChunks
           * @returns
           */
          const findComponentName = pathChunks => {
            const chunk = pathChunks.pop();
            if (!chunk) return null;
            return chunk.startsWith("ea-")
              ? chunk
              : findComponentName(pathChunks);
          };

          if (normalizedId.includes(".scss?inline")) {
            const fullPathChunk = normalizedId.split("/");
            const fullName = findComponentName(fullPathChunk);

            return `css/${fullName}`;
          }

          if (normalizedId.startsWith(componentsPath + "/")) {
            const name = normalizedId
              .slice(componentsPath.length + 1)
              .replace(".js", "");

            if (name === "Base") {
              return `${name}`;
            } else {
              const parts = name.split("/");
              const comp = parts[0];
              if (comp && comp.startsWith("ea-")) return comp;
            }
          }

          if (
            normalizedId.includes(".scss?inline") &&
            normalizedId.includes("themes")
          ) {
            const name = normalizedId
              .split("/")
              .pop()
              ?.replace(".scss?inline", "");
            return `themes/${name}`;
          }

          if (
            normalizedId.startsWith(themesSrcDir + "/") &&
            normalizedId.includes(".scss") &&
            !normalizedId.includes("?inline")
          ) {
            const name = normalizedId.split("/").pop()?.replace(".scss", "");
            return `themes/${name}`;
          }

          if (normalizedId.startsWith(commonPath)) {
            const ary = normalizedId.split("/");
            const name = findComponentName(ary);

            if (name) return `${name}`;
          }

          if (normalizedId.startsWith(componentsPath)) {
            const ary = normalizedId.split("/");
            const name = findComponentName(ary);

            if (name?.startsWith("ea-")) return `${name}`;
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [themesSrcDir],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@common": resolve(__dirname, "src/common"),
    },
  },
});
