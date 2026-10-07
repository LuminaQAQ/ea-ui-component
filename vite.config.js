import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  RESOLVE_EXTENSIONS,
  componentsSourceAliases,
  coreSourceAliases,
  createEsbuildOptions,
  createScssOptions,
  workspaceSourceAliases,
} from "./internal/vite-config/index";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const coreSrc = resolve(__dirname, "packages/core/src");
const themesSrc = resolve(__dirname, "packages/themes/src");

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  esbuild: createEsbuildOptions({ target: "es2020" }),
  resolve: {
    extensions: RESOLVE_EXTENSIONS,
    alias: [
      ...workspaceSourceAliases({ coreSrcDir: coreSrc, themesSrcDir: themesSrc }),
      ...coreSourceAliases(coreSrc),
      ...componentsSourceAliases(resolve(__dirname, "packages/components/src")),
    ],
  },
  css: {
    preprocessorOptions: {
      scss: createScssOptions(resolve(themesSrc, "styles")),
    },
  },
});
