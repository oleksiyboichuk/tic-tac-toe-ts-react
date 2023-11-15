/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'redyan-100': 'hsl(90, 18%, 64%)',
        'redyan-200': 'hsl(148, 30%, 46%)',
        'redyan-300': 'hsl(157, 16%, 28%)',
        'redyan-400': 'hsl(320, 15%, 19%)',
      }
    },
  },
  plugins: [],
}