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
    pool: "forks",
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
        },
      },
    },
  },
  oxc: false,
  esbuild: {
    target: "es2022",
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@core": resolve(__dirname, "src/core"),
      "@decorator": resolve(__dirname, "src/decorator"),
      "@themes": resolve(__dirname, "src/themes"),
      "@utils": resolve(__dirname, "src/utils"),
      "@common": resolve(__dirname, "src/common"),
      "@events": resolve(__dirname, "src/events"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, "src")],
        additionalData: `
          @use "themes/namespace" as *;
          @use "themes/mixins" as *;
        `,
      },
    },
  },
});
