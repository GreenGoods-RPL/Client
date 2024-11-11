import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#439A97",
        secondary: "#62B6B7",
        tertiary: "#97DECE",
        light: "#CBEDD5",
        neutral: "#FFFBE6",
        dark: "#565151"
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        yanone: ["var(--font-yanone)"],
      },
    },
  },
  plugins: [],
};
export default config;
