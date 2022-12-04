/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#3b82f6",
          2: "#60a5fa",
          3: "#bfdbfe",
          4: "#dbeafe",
          5: "#eff6ff",
        },
      },
    },
  },
  plugins: [],
};
