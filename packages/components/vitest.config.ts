import { defineConfig } from "vitest/config";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreSrc = resolve(__dirname, "../core/src");
const themesSrc = resolve(__dirname, "../themes/src");

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{js,ts}"],
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
      "@easy-component-ui/core": coreSrc,
      "@easy-component-ui/themes": themesSrc,
      "@/types": resolve(coreSrc, "types"),
      "@/stores": resolve(coreSrc, "stores"),
      "@/utils": resolve(coreSrc, "utils"),
      "@core": resolve(coreSrc, "core"),
      "@decorator": resolve(coreSrc, "decorator"),
      "@utils": resolve(coreSrc, "utils"),
      "@constants": resolve(coreSrc, "constants"),
      "@stores": resolve(coreSrc, "stores"),
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@common": resolve(__dirname, "src/common"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [themesSrc],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
});
