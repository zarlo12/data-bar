/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "Arial", "sans-serif"],
      },
      backgroundImage: {
        persona: "url('/assets_base/4FondoPersona.png')",
        "persona-tenue": "url('/assets_base/4FondoPersonaTenue.png')",
      },
      scale: {
        102: "1.02",
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
