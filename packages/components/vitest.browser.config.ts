import { defineConfig } from "vitest/config";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { playwright } from "@vitest/browser-playwright";
import {
  TEST_TIMEOUTS,
  componentsSourceAliases,
  coreSourceAliases,
  createEsbuildOptions,
  createScssOptions,
  workspaceSourceAliases,
} from "../../internal/vite-config/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreSrc = resolve(__dirname, "../core/src");
const themesSrc = resolve(__dirname, "../themes/src");

export default defineConfig({
  test: {
    globals: true,
    include: ["src/test/browser/**/*.browser.test.js"],
    ...TEST_TIMEOUTS,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
  esbuild: createEsbuildOptions({ target: "es2022" }),
  resolve: {
    alias: [
      ...workspaceSourceAliases({
        coreSrcDir: coreSrc,
        themesSrcDir: themesSrc,
      }),
      ...coreSourceAliases(coreSrc),
      ...componentsSourceAliases(resolve(__dirname, "src")),
    ],
  },
  css: {
    preprocessorOptions: {
      scss: createScssOptions(resolve(themesSrc, "styles")),
    },
  },
});
