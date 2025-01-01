/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "custom-pattern": "url('/lino.jpg')", // Add your own image path here
      },
      colors: {
        primary: "#010056",
        secondary: "#1B1C1E",
      },
      clipPath: {
        circle: "circle(50%)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        bounce: "bounce 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
