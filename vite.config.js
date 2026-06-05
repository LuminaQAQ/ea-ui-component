import { defineConfig, normalizePath } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import entryConfigs from "./configs/entryConfig.ts";
import path, { resolve } from "node:path";
import dtsPlugin from "vite-plugin-dts";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
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

          if (chunkInfo.name.startsWith("utils/")) {
            return `${chunkInfo.name}.js`;
          }

          if (chunkInfo.name.startsWith("core/")) {
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
          const componentsPath = normalizePath(
            path.resolve(__dirname, "src/components")
          );
          const decoratorPath = normalizePath(
            path.resolve(__dirname, "src/decorator")
          );
          const constantsPath = normalizePath(
            path.resolve(__dirname, "src/constants")
          );
          const themesPath = normalizePath(
            path.resolve(__dirname, "src/themes")
          );
          const normalizedId = normalizePath(id);
          /**
           * @param {Array<string>} pathChunks
           * @returns
           */
          const findComponentName = pathChunks => {
            const chunk = pathChunks.pop();
            return chunk?.startsWith("ea-")
              ? chunk
              : findComponentName(pathChunks);
          };
          /**
           * @param {Array<string>} pathChunks
           * @returns
           */
          const findCoreComponentName = pathChunks => {
            const chunk = pathChunks.pop();
            return chunk?.includes("Base")
              ? chunk
              : findCoreComponentName(pathChunks);
          };

          if (normalizedId.startsWith(decoratorPath)) {
            return "core/decorator";
          }

          if (normalizedId.startsWith(constantsPath)) {
            return "core/constants";
          }

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

          if (normalizedId.includes("core") && normalizedId.includes("Base")) {
            const fullPathChunk = normalizedId.split("/");
            const fullName = findCoreComponentName(fullPathChunk);

            return `core/${fullName}`;
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
            normalizedId.startsWith(themesPath + "/") &&
            normalizedId.includes(".scss") &&
            !normalizedId.includes("?inline")
          ) {
            const name = normalizedId.split("/").pop()?.replace(".scss", "");
            return `themes/${name}`;
          }

          if (
            normalizedId.startsWith(themesPath + "/") &&
            normalizedId.includes("controller")
          ) {
            return "themes/controller";
          }

          if (normalizedId.startsWith(utilsPath)) {
            const name = normalizedId.split("/").pop()?.replace(".js", "");
            return `utils/${name}`;
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
        loadPaths: [resolve(__dirname, "src")],
        additionalData: `
          @use "themes/namespace" as *;
          @use "themes/mixins" as *;
        `,
      },
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@themes": resolve(__dirname, "src/themes"),
      "@utils": resolve(__dirname, "src/utils"),
      "@common": resolve(__dirname, "src/common"),
      "@events": resolve(__dirname, "src/events"),
      "@core": resolve(__dirname, "src/core"),
      "@decorator": resolve(__dirname, "src/decorator"),
      "@types": resolve(__dirname, "src/types"),
      "@stores": resolve(__dirname, "src/stores"),
      "@constants": resolve(__dirname, "src/constants"),
    },
  },
});
