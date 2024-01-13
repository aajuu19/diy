import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", "1.25"],
      sm: ["0.875rem", "1.75rem"],
      base: ["1rem", "1.75rem"],
      xl: ["1.125rem", "2rem"],
      "2xl": ["1.5rem", "2.125rem"],
      "3xl": ["2rem", "2.625rem"],
      "4xl": ["2.25rem", "2.875rem"],
      "5xl": ["2.5rem", "3.125rem"],
      "6xl": ["2.75rem", "3.375rem"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f39b21",
          "primary-content": "#ffffff",
          secondary: "#ffbf66",
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
