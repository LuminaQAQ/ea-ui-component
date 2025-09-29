import { defineConfig, normalizePath } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import entryConfigs from "./configs/entryConfig.js";
import path, { resolve } from "node:path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: "dist/stats.html",
    // }),
  ],
  build: {
    lib: {
      entry: entryConfigs,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "components/[name].js",
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.startsWith("css/")) {
            return `${chunkInfo.name}.style.js`;
          }

          if (chunkInfo.name.startsWith("utils/")) {
            return `${chunkInfo.name}.js`;
          }

          if (chunkInfo.name.startsWith("themes/")) {
            return `${chunkInfo.name}.style.js`;
          }

          return `components/[name].js`;
        },
        assetFileNames: "assets/icon.css",
        manualChunks(id) {
          const utilsPath = normalizePath(path.resolve(__dirname, "src/utils"));
          const commonPath = normalizePath(
            path.resolve(__dirname, "src/common")
          );
          const normalizedId = normalizePath(id);

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

          if (normalizedId.includes(".scss?inline")) {
            /**
             * @param {Array<string>} pathChunks
             * @returns
             */
            const findComponentName = (pathChunks) => {
              const chunk = pathChunks.pop();
              return chunk?.startsWith("ea-")
                ? chunk
                : findComponentName(pathChunks);
            };

            const fullPathChunk = normalizedId.split("/");
            const fullName = findComponentName(fullPathChunk);

            return `css/${fullName}`;
          }

          if (normalizedId.startsWith(utilsPath)) {
            const name = normalizedId.split("/").pop()?.replace(".js", "");
            return `utils/${name}`;
          }

          if (normalizedId.startsWith(commonPath)) {
            const name = normalizedId.split("/").pop()?.replace(".js", "");
            return `components/${name}`;
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [resolve(__dirname, "src")],
        additionalData: `@use "themes/namespace" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@themes": resolve(__dirname, "src/themes"),
      "@utils": resolve(__dirname, "src/utils"),
      "@common": resolve(__dirname, "src/common"),
    },
  },
});
