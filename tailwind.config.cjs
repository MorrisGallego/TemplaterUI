module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Silkscreen", "cursive"],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}