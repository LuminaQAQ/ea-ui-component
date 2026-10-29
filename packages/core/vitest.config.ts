import { defineConfig, configDefaults } from "vitest/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  RESOLVE_EXTENSIONS,
  coreSourceAliases,
  createEsbuildOptions,
  createScssOptions,
  createTestDefaults,
} from "../../internal/vite-config/index";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const srcDir = resolve(__dirname, "src");
const themesStylesDir = resolve(__dirname, "../themes/src/styles");

export default defineConfig({
  test: {
    ...createTestDefaults({ maxWorkers: 4 }),
    include: ["src/**/*.test.ts"],
    exclude: [...configDefaults.exclude],
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // 覆盖率只统计源码本体，排除测试夹具与类型声明
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/test/**", "src/types/**"],
    },
  },
  esbuild: createEsbuildOptions({ target: "es2022" }),
  resolve: {
    extensions: RESOLVE_EXTENSIONS,
    alias: coreSourceAliases(srcDir),
  },
  css: {
    preprocessorOptions: {
      scss: createScssOptions(themesStylesDir),
    },
  },
});
