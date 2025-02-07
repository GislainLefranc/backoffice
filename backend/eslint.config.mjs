import eslintPluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      "import/no-unresolved": "error",
      "import/no-absolute-path": "error",
    },
    extends: [eslintConfigPrettier],
  },
];
