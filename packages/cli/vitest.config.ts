import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // CLI 依赖真实 node:fs / node:path / 子进程，使用 node 环境而非 jsdom
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    pool: "forks",
    maxWorkers: 4,
    testTimeout: 20000,
    hookTimeout: 20000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,ts}"],
      exclude: [
        "src/**/*.test.ts",
        "src/test/**",
        "node_modules/",
        "src/index.ts",
        "src/bin.ts",
      ],
      thresholds: {
        statements: 93,
        branches: 90,
        functions: 97,
        lines: 95,
      },
    },
  },
});
