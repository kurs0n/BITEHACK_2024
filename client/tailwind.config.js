/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto SLab", "sans-serif"], // Lato as the default font
      },
    },
  },
  plugins: [],
};
