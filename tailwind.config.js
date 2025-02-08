/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-1": "#F7F8FB",
        "color-2": "#D8EFD3",
        "color-3": "#F1F8E8",
        "color-4": "#55AD9B",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3d73bd",
        },
      },
    ],
  },
};
