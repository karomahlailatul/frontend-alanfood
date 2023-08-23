/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#00acee",
        "primary-green": "#7cb083",
        "primary-red": "#da7374",
        "primary-background": "#f8f8f8",
        "table-head": "#f0f0f0",
        "table-body-primary": "#fafafa",
        "table-body-secondary": "#ffffff",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require("@tailwindcss/forms"),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/container-queries'),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
