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
      "@": resolve(__dirname, "packages/components/src/"),
      "@components": resolve(__dirname, "packages/components/src/components"),
      "@common": resolve(__dirname, "packages/components/src/common"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [themesSrc],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
});
