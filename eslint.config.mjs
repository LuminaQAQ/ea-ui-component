import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "dist/",
      "build/",
      "coverage/",
      "docs/.vitepress/dist/",
      "docs/.vitepress/cache/",
      "docs/.vitepress/public/",
      "src/test/",
      "vite.config.js.timestamp-*",
      "upload-server/uploads/",
      "upload-server/logs/",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^[A-Z][a-zA-Z]*$",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "no-console": "off",
      "no-debugger": "error",
    },
  },
]);
