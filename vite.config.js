import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import entryConfigs from "./configs/entryConfig.js";
import path, { resolve } from "node:path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html",
    }),
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
          if (id.includes(".scss?inline") && id.includes("themes")) {
            const name = id.split("/").pop()?.replace(".scss?inline", "");
            return `themes/${name}`;
          }

          if (id.includes(".scss?inline")) {
            const fullPathChunk = id.split("/");
            const fullName = fullPathChunk[fullPathChunk.length - 2];

            return `css/${fullName}`;
          }

          if (id.startsWith(path.join(__dirname, "/src/utils"))) {
            const name = id.split("/").pop()?.replace(".js", "");
            return `utils/${name}`;
          }

          if (id.startsWith(path.join(__dirname, "/src/common"))) {
            const name = id.split("/").pop()?.replace(".js", "");
            return `components/${name}`;
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @import "components/ea-ui-base-style.scss";
                `,
        includePaths: [resolve(__dirname, "src")],
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
