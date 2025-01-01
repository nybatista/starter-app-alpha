// eslint.config.js (flat config)
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        require: "readonly",
      },
    },

    // Register the plugin
    plugins: {
      prettier: prettierPlugin,
    },

    // Combine ESLint’s recommended + Prettier’s recommended
    rules: {
      ...js.configs.recommended.rules,       // "eslint:recommended"
      ...prettierPlugin.configs.recommended.rules, // "plugin:prettier/recommended"

      // optionally add or override rules
      // "prettier/prettier": "warn" // for example
    },
  },
];
