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
    alias: [
      {
        find: /^@easy-component-ui\/themes\/([\w-]+)\.scss(\?.*)?$/,   
        replacement: `${themesSrc}/styles/$1.scss$2`,
      },
      { find: "@easy-component-ui/core", replacement: coreSrc },
      { find: "@easy-component-ui/themes", replacement: themesSrc },
      { find: "@core", replacement: resolve(coreSrc, "core") },
      { find: "@decorator", replacement: resolve(coreSrc, "decorator") },
      { find: "@utils", replacement: resolve(coreSrc, "utils") },
      { find: "@stores", replacement: resolve(coreSrc, "stores") },
      { find: "@", replacement: resolve(__dirname, "src/") },
      { find: "@components", replacement: resolve(__dirname, "src/components") },
      { find: "@common", replacement: resolve(__dirname, "src/common") },
      { find: "@constants", replacement: resolve(__dirname, "src/constants") },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(themesSrc, "styles")],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
});
