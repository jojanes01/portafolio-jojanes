import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "icon-[bi--check2-circle]",
    "icon-[tabler--automation]",
    "icon-[tabler--users]",
    "icon-[tabler--book]",
    "icon-[tabler--chart-bar]",
    "icon-[tabler--map-pin]",
    "icon-[tabler--shopping-cart]",
    "icon-[tabler--server]",
    "icon-[tabler--book]",
    "icon-[tabler--chart-line]",
    "icon-[tabler--test-pipe]",
    "icon-[tabler--forms]",
    "icon-[tabler--brand-html5]",
    "icon-[tabler--robot]",
    "icon-[tabler--cloud-upload]",
    "icon-[tabler--chart-pie]",
    "icon-[tabler--building-warehouse]",
    "icon-[tabler--cash]",
    "icon-[tabler--shield-check]",
    "icon-[tabler--cloud-off]",
    "icon-[tabler--refresh]",
  ],
  theme: {
    extend: {
      colors: {
        "jojanes-green": "#2ae98d",
        "jojanes-subtitle": "#8c8c94",
        // "jojanes-border": "#54545c",
        "jojanes-black": "#000000",
        // "jojanes-white": "#FFFFFF",
        "jojanes-gray": "#1d1d1d",
        "jojanes-dark": "#121212",
        "jojanes-gray-dark": "#1E1E1E",
        "jojanes-white": "#EAEAEA",
        "jojanes-gray-light": "#A0A0A0",
        "jojanes-border": "#333333",
        "jojanes-green-dark": "#229C70",
        "jojanes-red": "#FF4C4C",
        "jojanes-blue": "#3B82F6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [addDynamicIconSelectors(), require("tailwindcss-animate")],
};
export default config;
