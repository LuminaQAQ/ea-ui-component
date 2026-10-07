import { defineConfig } from "vitest/config";
import {
  createEsbuildOptions,
  createTestDefaults,
} from "../../internal/vite-config/index";

export default defineConfig({
  test: {
    ...createTestDefaults({ maxWorkers: 4 }),
    include: ["src/**/*.test.{js,ts}"],
  },
  esbuild: createEsbuildOptions({ target: "es2022" }),
});
