/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#68001E',
        secondary: '#68001A',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'content': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
