import { defineConfig } from "vitest/config";
import path, { resolve } from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/components/**/*.{js,ts}"],
      exclude: ["node_modules/", "src/**/*.test.js"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@themes": resolve(__dirname, "src/themes"),
      "@utils": resolve(__dirname, "src/utils"),
      "@common": resolve(__dirname, "src/common"),
      "@events": resolve(__dirname, "src/events"),
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
});
