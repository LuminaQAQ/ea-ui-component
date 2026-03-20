module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ["eslint:recommended", "plugin:prettier/recommended"],

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },

  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "no-debugger": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "arrow-spacing": "error",
    "template-curly-spacing": "error",
    "object-shorthand": "error",
    "prettier/prettier": "error",
  },

  overrides: [
    {
      files: ["src/components/**/*.js"],
      rules: {
        "no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^[A-Z][a-zA-Z]*$",
          },
        ],
      },
    },
  ],

  globals: {
    customElements: "readonly",
    HTMLElement: "readonly",
    ShadowRoot: "readonly",
    CSSStyleSheet: "readonly",
  },
};
