/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--color-primary-main)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "var(--color-secondary-main)",
          light: "#ff5c8d",
          dark: "#9a0036",
          contrastText: "#FFFFFF",
        },
        title: {
          main: "var(--color-title-main)",
          themecolor: "var(--color-title-themecolor)",
        },
        background: {
          default: "var(--bg-default)",
          paper: "var(--bg-paper)",
          cardcolor: "var(--bg-card)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        appbar: {
          main: "var(--bg-appbar)",
        },
        itemhover: {
          main: "var(--bg-itemhover)",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Lora", "serif"],
        parkinsans: ["Parkinsans", "sans-serif"],
      },
      animation: {
        "slide-in-left": "slideInLeft 0.3s ease-out forwards",
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
