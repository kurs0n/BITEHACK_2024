/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Slab", "sans-serif"], // Lato as the default font
      },
    },
    keyframes: {
      typing: {
        "0%": { width: "0" },
        "100%": { width: "100%" },
      },
      blink: {
        "50%": { borderColor: "transparent" },
        "100%": { borderColor: "black" },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      typing: "typing 1.5s steps(30) forwards, blink 1s step-end infinite", // Typing with blinking cursor
      "typing-cursor": "typing 4s steps(30) forwards", // Typing only (no cursor blinking)
      spin: "spin 1.5s linear infinite",
    },
  },
  plugins: [],
};
