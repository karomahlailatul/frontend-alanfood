/* eslint-disable no-undef */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "plugin:@next/next/core-web-vitals",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "prettier", "tailwindcss", "simple-import-sort"],
  rules: {
    // "react-refresh/only-export-components": "warn",
    // "no-undef": "off",
    // "react-hooks/exhaustive-deps": "warn",
    // "no-unused-vars": "warn",
    // "react/display-name": "warn",
    "react-hooks/exhaustive-deps": "off",

    //* prettier */
    "prettier/prettier": "warn",
    "no-console": "warn",
    //* typescript */
    "@typescript-eslint/no-unused-vars": "error", // "error", // warn
    "@typescript-eslint/no-explicit-any": "warn", // "error",
    //* tailwindcss */
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "error",
    "tailwindcss/no-contradicting-classname": "error",
    //* next/core */
    "@next/next/no-img-element": "off",

    //* simple import sort */
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
};
