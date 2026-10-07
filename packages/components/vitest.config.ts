import { defineConfig, configDefaults } from "vitest/config";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  componentsSourceAliases,
  coreSourceAliases,
  createEsbuildOptions,
  createScssOptions,
  createTestDefaults,
  workspaceSourceAliases,
} from "../../internal/vite-config/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreSrc = resolve(__dirname, "../core/src");
const themesSrc = resolve(__dirname, "../themes/src");

export default defineConfig({
  test: {
    ...createTestDefaults({ maxWorkers: 4 }),
    include: ["src/**/*.test.{js,ts}"],
    exclude: [...configDefaults.exclude, "src/test/browser/**"],
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/components/**/*.{js,ts}"],
      exclude: ["node_modules/", "src/**/*.test.js"],
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
