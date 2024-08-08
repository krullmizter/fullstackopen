module.exports = [
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {},
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true, semi: false }],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
    },
    ignores: ["node_modules/**", "public/**", ".eslintrc.js"],
  },
  {
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: false, semi: true }],
    },
  },
];
