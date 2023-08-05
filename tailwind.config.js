/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        popins: ["Poppins", "sans-serif"],
      },
      animation: {
        indeterminate: "indeterminate 2s linear infinite",
      },
      keyframes: {
        indeterminate: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(240%)" },
        },
      },
    },
  },
  plugins: [],
};
