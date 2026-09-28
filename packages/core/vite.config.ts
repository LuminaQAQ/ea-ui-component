import { defineConfig } from "vite";
import path from "node:path";
import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dtsPlugin from "vite-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "src");

const sourceDirs = ["core", "decorator", "utils", "stores"];

const entryConfigs: Record<string, string> = {};
sourceDirs.forEach(dir => {
  const dirPath = resolve(srcDir, dir);
  readdirSync(dirPath).forEach((file: string) => {
    if (!file.endsWith(".ts")) return;
    const filePath = resolve(dirPath, file);
    if (!statSync(filePath).isFile()) return;
    entryConfigs[`${dir}/${file.replace(/\.ts$/, "")}`] = filePath;
  });
});

export default defineConfig({
  esbuild: {
    target: "es2020",
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  plugins: [dtsPlugin({ outDir: "dist/types" })],
  build: {
    lib: {
      entry: entryConfigs,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [resolve(__dirname, "../themes/src")],
        additionalData: `
          @use "namespace" as *;
          @use "mixins" as *;
        `,
      },
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@core": resolve(srcDir, "core"),
      "@decorator": resolve(srcDir, "decorator"),
      "@utils": resolve(srcDir, "utils"),
      "@stores": resolve(srcDir, "stores"),
    },
  },
});
