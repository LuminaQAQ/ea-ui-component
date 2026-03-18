// vite.config.js
import { defineConfig, normalizePath } from "file:///E:/repo/ea-ui-component/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///E:/repo/ea-ui-component/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// configs/entryConfig.js
import { readdirSync, statSync } from "fs";
import { resolve } from "path";
var dir = resolve(process.cwd(), "src/components");
var commonDir = resolve(process.cwd(), "src/common");
var entryConfigs = {
  index: resolve(process.cwd(), "src/components/index.js")
};
readdirSync(dir).forEach((file) => {
  const isDirectory = statSync(resolve(dir, file)).isDirectory();
  if (isDirectory) {
    entryConfigs[file] = resolve(process.cwd(), `src/components/${file}/index.js`);
  }
});
readdirSync(commonDir).forEach((file) => {
  const isDirectory = statSync(resolve(commonDir, file)).isDirectory();
  if (isDirectory) {
    entryConfigs[file] = resolve(process.cwd(), `src/common/${file}/index.js`);
  }
});
var entryConfig_default = entryConfigs;

// vite.config.js
import path, { resolve as resolve2 } from "node:path";
import dtsPlugin from "file:///E:/repo/ea-ui-component/node_modules/vite-plugin-dts/dist/index.mjs";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///E:/repo/ea-ui-component/vite.config.js";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  plugins: [
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: "dist/stats.html",
    // }),
    dtsPlugin({ outDir: "dist/types" })
  ],
  build: {
    lib: {
      entry: entryConfig_default,
      formats: ["es"]
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
          const normalizedId = normalizePath(id);
          const findComponentName = (pathChunks) => {
            const chunk = pathChunks.pop();
            return chunk?.startsWith("ea-") ? chunk : findComponentName(pathChunks);
          };
          const findCoreComponentName = (pathChunks) => {
            const chunk = pathChunks.pop();
            return chunk?.includes("Base") ? chunk : findCoreComponentName(pathChunks);
          };
          if (normalizedId.includes(".scss?inline")) {
            const fullPathChunk = normalizedId.split("/");
            const fullName = findComponentName(fullPathChunk);
            return `css/${fullName}`;
          }
          if (normalizedId.startsWith(componentsPath + "/")) {
            const name = normalizedId.slice(componentsPath.length + 1).replace(".js", "");
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
          if (normalizedId.includes(".scss?inline") && normalizedId.includes("themes")) {
            const name = normalizedId.split("/").pop()?.replace(".scss?inline", "");
            return `themes/${name}`;
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
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [resolve2(__dirname, "src")],
        additionalData: `
          @use "themes/namespace" as *;
          @use "themes/mixins" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve2(__dirname, "src/"),
      "@components": resolve2(__dirname, "src/components"),
      "@themes": resolve2(__dirname, "src/themes"),
      "@utils": resolve2(__dirname, "src/utils"),
      "@common": resolve2(__dirname, "src/common"),
      "@events": resolve2(__dirname, "src/events")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiY29uZmlncy9lbnRyeUNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHJlcG9cXFxcZWEtdWktY29tcG9uZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxyZXBvXFxcXGVhLXVpLWNvbXBvbmVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcmVwby9lYS11aS1jb21wb25lbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xyXG5pbXBvcnQgZW50cnlDb25maWdzIGZyb20gXCIuL2NvbmZpZ3MvZW50cnlDb25maWcuanNcIjtcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcclxuaW1wb3J0IGR0c1BsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHBvcnQ6IDUxNzMsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICAvLyB2aXN1YWxpemVyKHtcclxuICAgIC8vICAgb3BlbjogdHJ1ZSxcclxuICAgIC8vICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAvLyAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICAvLyAgIGZpbGVuYW1lOiBcImRpc3Qvc3RhdHMuaHRtbFwiLFxyXG4gICAgLy8gfSksXHJcbiAgICBkdHNQbHVnaW4oeyBvdXREaXI6IFwiZGlzdC90eXBlc1wiIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogZW50cnlDb25maWdzLFxyXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImNvbXBvbmVudHMvW25hbWVdLmpzXCIsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGNodW5rSW5mbyA9PiB7XHJcbiAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUuc3RhcnRzV2l0aChcImNzcy9cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2NodW5rSW5mby5uYW1lfS5zdHlsZS5qc2A7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lLnN0YXJ0c1dpdGgoXCJ1dGlscy9cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2NodW5rSW5mby5uYW1lfS5qc2A7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lLnN0YXJ0c1dpdGgoXCJjb3JlL1wiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7Y2h1bmtJbmZvLm5hbWV9LmpzYDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUuc3RhcnRzV2l0aChcInRoZW1lcy9cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2NodW5rSW5mby5uYW1lfS5zdHlsZS5qc2A7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGBjb21wb25lbnRzL1tuYW1lXS5qc2A7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvaWNvbi5jc3NcIixcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGNvbnN0IHV0aWxzUGF0aCA9IG5vcm1hbGl6ZVBhdGgocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdXRpbHNcIikpO1xyXG4gICAgICAgICAgY29uc3QgY29tbW9uUGF0aCA9IG5vcm1hbGl6ZVBhdGgoXHJcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbW1vblwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHNQYXRoID0gbm9ybWFsaXplUGF0aChcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29tcG9uZW50c1wiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRJZCA9IG5vcm1hbGl6ZVBhdGgoaWQpO1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhdGhDaHVua3NcclxuICAgICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIGNvbnN0IGZpbmRDb21wb25lbnROYW1lID0gcGF0aENodW5rcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gcGF0aENodW5rcy5wb3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNodW5rPy5zdGFydHNXaXRoKFwiZWEtXCIpXHJcbiAgICAgICAgICAgICAgPyBjaHVua1xyXG4gICAgICAgICAgICAgIDogZmluZENvbXBvbmVudE5hbWUocGF0aENodW5rcyk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhdGhDaHVua3NcclxuICAgICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIGNvbnN0IGZpbmRDb3JlQ29tcG9uZW50TmFtZSA9IHBhdGhDaHVua3MgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaHVuayA9IHBhdGhDaHVua3MucG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaHVuaz8uaW5jbHVkZXMoXCJCYXNlXCIpXHJcbiAgICAgICAgICAgICAgPyBjaHVua1xyXG4gICAgICAgICAgICAgIDogZmluZENvcmVDb21wb25lbnROYW1lKHBhdGhDaHVua3MpO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBpZiAobm9ybWFsaXplZElkLmluY2x1ZGVzKFwiLnNjc3M/aW5saW5lXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoQ2h1bmsgPSBub3JtYWxpemVkSWQuc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmdWxsTmFtZSA9IGZpbmRDb21wb25lbnROYW1lKGZ1bGxQYXRoQ2h1bmspO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGBjc3MvJHtmdWxsTmFtZX1gO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuc3RhcnRzV2l0aChjb21wb25lbnRzUGF0aCArIFwiL1wiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gbm9ybWFsaXplZElkXHJcbiAgICAgICAgICAgICAgLnNsaWNlKGNvbXBvbmVudHNQYXRoLmxlbmd0aCArIDEpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoXCIuanNcIiwgXCJcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJCYXNlXCIpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gYCR7bmFtZX1gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgY29uc3QgY29tcCA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICAgIGlmIChjb21wICYmIGNvbXAuc3RhcnRzV2l0aChcImVhLVwiKSkgcmV0dXJuIGNvbXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAobm9ybWFsaXplZElkLmluY2x1ZGVzKFwiY29yZVwiKSAmJiBub3JtYWxpemVkSWQuaW5jbHVkZXMoXCJCYXNlXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoQ2h1bmsgPSBub3JtYWxpemVkSWQuc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmdWxsTmFtZSA9IGZpbmRDb3JlQ29tcG9uZW50TmFtZShmdWxsUGF0aENodW5rKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgY29yZS8ke2Z1bGxOYW1lfWA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBub3JtYWxpemVkSWQuaW5jbHVkZXMoXCIuc2Nzcz9pbmxpbmVcIikgJiZcclxuICAgICAgICAgICAgbm9ybWFsaXplZElkLmluY2x1ZGVzKFwidGhlbWVzXCIpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IG5vcm1hbGl6ZWRJZFxyXG4gICAgICAgICAgICAgIC5zcGxpdChcIi9cIilcclxuICAgICAgICAgICAgICAucG9wKClcclxuICAgICAgICAgICAgICA/LnJlcGxhY2UoXCIuc2Nzcz9pbmxpbmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBgdGhlbWVzLyR7bmFtZX1gO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuc3RhcnRzV2l0aCh1dGlsc1BhdGgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBub3JtYWxpemVkSWQuc3BsaXQoXCIvXCIpLnBvcCgpPy5yZXBsYWNlKFwiLmpzXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYHV0aWxzLyR7bmFtZX1gO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuc3RhcnRzV2l0aChjb21tb25QYXRoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnkgPSBub3JtYWxpemVkSWQuc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZmluZENvbXBvbmVudE5hbWUoYXJ5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lKSByZXR1cm4gYCR7bmFtZX1gO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChub3JtYWxpemVkSWQuc3RhcnRzV2l0aChjb21wb25lbnRzUGF0aCkpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJ5ID0gbm9ybWFsaXplZElkLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGZpbmRDb21wb25lbnROYW1lKGFyeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmFtZT8uc3RhcnRzV2l0aChcImVhLVwiKSkgcmV0dXJuIGAke25hbWV9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYXBpOiBcIm1vZGVybi1jb21waWxlclwiLFxyXG4gICAgICAgIGxvYWRQYXRoczogW3Jlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKV0sXHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcclxuICAgICAgICAgIEB1c2UgXCJ0aGVtZXMvbmFtZXNwYWNlXCIgYXMgKjtcclxuICAgICAgICAgIEB1c2UgXCJ0aGVtZXMvbWl4aW5zXCIgYXMgKjtcclxuICAgICAgICBgLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvXCIpLFxyXG4gICAgICBcIkBjb21wb25lbnRzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jb21wb25lbnRzXCIpLFxyXG4gICAgICBcIkB0aGVtZXNcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3RoZW1lc1wiKSxcclxuICAgICAgXCJAdXRpbHNcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3V0aWxzXCIpLFxyXG4gICAgICBcIkBjb21tb25cIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbW1vblwiKSxcclxuICAgICAgXCJAZXZlbnRzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9ldmVudHNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHJlcG9cXFxcZWEtdWktY29tcG9uZW50XFxcXGNvbmZpZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHJlcG9cXFxcZWEtdWktY29tcG9uZW50XFxcXGNvbmZpZ3NcXFxcZW50cnlDb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3JlcG8vZWEtdWktY29tcG9uZW50L2NvbmZpZ3MvZW50cnlDb25maWcuanNcIjtpbXBvcnQgeyByZWFkZGlyU3luYywgc3RhdFN5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcblxyXG5cclxuY29uc3QgZGlyID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2NvbXBvbmVudHMnKTtcclxuY29uc3QgY29tbW9uRGlyID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2NvbW1vbicpO1xyXG5cclxuY29uc3QgZW50cnlDb25maWdzID0ge1xyXG4gICAgaW5kZXg6IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9jb21wb25lbnRzL2luZGV4LmpzJyksXHJcbn07XHJcblxyXG5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgIGNvbnN0IGlzRGlyZWN0b3J5ID0gc3RhdFN5bmMocmVzb2x2ZShkaXIsIGZpbGUpKS5pc0RpcmVjdG9yeSgpO1xyXG5cclxuICAgIGlmIChpc0RpcmVjdG9yeSkge1xyXG4gICAgICAgIGVudHJ5Q29uZmlnc1tmaWxlXSA9IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgYHNyYy9jb21wb25lbnRzLyR7ZmlsZX0vaW5kZXguanNgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbnJlYWRkaXJTeW5jKGNvbW1vbkRpcikuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgY29uc3QgaXNEaXJlY3RvcnkgPSBzdGF0U3luYyhyZXNvbHZlKGNvbW1vbkRpciwgZmlsZSkpLmlzRGlyZWN0b3J5KCk7XHJcblxyXG4gICAgaWYgKGlzRGlyZWN0b3J5KSB7XHJcbiAgICAgICAgZW50cnlDb25maWdzW2ZpbGVdID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBgc3JjL2NvbW1vbi8ke2ZpbGV9L2luZGV4LmpzYClcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbnRyeUNvbmZpZ3MiXSwKICAibWFwcGluZ3MiOiAiO0FBQTZQLFNBQVMsY0FBYyxxQkFBcUI7QUFDelMsU0FBUyxrQkFBa0I7OztBQ0Q0UCxTQUFTLGFBQWEsZ0JBQWdCO0FBQzdULFNBQVMsZUFBZTtBQUd4QixJQUFNLE1BQU0sUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0I7QUFDbkQsSUFBTSxZQUFZLFFBQVEsUUFBUSxJQUFJ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
