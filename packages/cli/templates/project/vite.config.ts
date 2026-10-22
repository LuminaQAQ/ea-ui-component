import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRequire } from "node:module";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const resolvePath = (p: string) => fileURLToPath(new URL(p, import.meta.url));
const require = createRequire(import.meta.url);

// themes 导出 mixins.scss / namespace.scss；取其目录作为 SCSS loadPaths，
// 供组件 scss 中的 @use "mixins" as *; 使用（与内置组件模板一致）
const themesStylesDir = path.dirname(
  require.resolve("@easy-component-ui/themes/mixins.scss")
);

export default defineConfig({
  resolve: {
    alias: {
      "@": resolvePath("./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [themesStylesDir],
        additionalData: '@use "namespace" as *;\n@use "mixins" as *;',
      },
    },
  },
  build: {
    lib: {
      entry: resolvePath("./src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [/^@easy-component-ui\//],
    },
  },
  plugins: [dts({ include: ["src"], outDir: "dist/types" })],
});
