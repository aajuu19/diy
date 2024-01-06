import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d8bf95",
          "primary-content": "#ffffff",
          secondary: "#E6E2DD",
          accent: "#373A36",
          neutral: "#383838",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },
};
export default config;
