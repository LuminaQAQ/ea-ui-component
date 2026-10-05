import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const coreSrc = resolve(__dirname, "packages/core/src");
const themesSrc = resolve(__dirname, "packages/themes/src");

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
  resolve: {
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
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
      {
        find: "@",
        replacement: resolve(__dirname, "packages/components/src/"),
      },
      {
        find: "@components",
        replacement: resolve(__dirname, "packages/components/src/components"),
      },
      {
        find: "@common",
        replacement: resolve(__dirname, "packages/components/src/common"),
      },
      {
        find: "@constants",
        replacement: resolve(__dirname, "packages/components/src/constants"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [resolve(themesSrc, "styles")],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
});
