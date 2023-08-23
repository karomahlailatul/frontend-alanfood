const path = require("path");

module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => {
    const eslintCommand = `eslint --fix ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" ")}`;

    const prettierCommand = `prettier --write ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" ")}`;

    const eslintCheckCommand = `eslint ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" ")}`;

    const prettierCheckCommand = `prettier --check ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" ")}`;

    return [
      eslintCommand,
      prettierCommand,
      eslintCheckCommand,
      prettierCheckCommand,
    ];
  },
};
