import { resolve } from "node:path";

import type { Alias } from "vite";

export const RESOLVE_EXTENSIONS = [
  ".mjs",
  ".js",
  ".mts",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
];

export const SCSS_ADDITIONAL_DATA = `
          @use "namespace" as *;
          @use "mixins" as *;
        `;

export function createEsbuildOptions({
  target = "es2020",
}: { target?: string } = {}) {
  return {
    target,
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  };
}

export function createScssOptions(stylesDir: string) {
  return {
    api: "modern-compiler" as const,
    loadPaths: [stylesDir],
    additionalData: SCSS_ADDITIONAL_DATA,
  };
}

export function coreSourceAliases(coreSrcDir: string): Alias[] {
  return [
    { find: "@core", replacement: resolve(coreSrcDir, "core") },
    { find: "@decorator", replacement: resolve(coreSrcDir, "decorator") },
    { find: "@utils", replacement: resolve(coreSrcDir, "utils") },
    { find: "@stores", replacement: resolve(coreSrcDir, "stores") },
  ];
}

export function componentsSourceAliases(componentsSrcDir: string): Alias[] {
  return [
    { find: "@", replacement: componentsSrcDir },
    {
      find: "@components",
      replacement: resolve(componentsSrcDir, "components"),
    },
    { find: "@common", replacement: resolve(componentsSrcDir, "common") },
    { find: "@constants", replacement: resolve(componentsSrcDir, "constants") },
  ];
}

export function workspaceSourceAliases({
  coreSrcDir,
  themesSrcDir,
}: {
  coreSrcDir: string;
  themesSrcDir: string;
}): Alias[] {
  return [
    {
      find: /^@easy-component-ui\/themes\/([\w-]+)\.scss(\?.*)?$/,
      replacement: `${themesSrcDir}/styles/$1.scss$2`,
    },
    { find: "@easy-component-ui/core", replacement: coreSrcDir },
    { find: "@easy-component-ui/themes", replacement: themesSrcDir },
  ];
}

export const TEST_TIMEOUTS = {
  testTimeout: 15000,
  hookTimeout: 15000,
};

export function createTestDefaults({ maxWorkers = 4 }: { maxWorkers?: number } = {}) {
  return {
    environment: "jsdom" as const,
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    pool: "forks" as const,
    maxWorkers,
    ...TEST_TIMEOUTS,
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
        },
      },
    },
  };
}
