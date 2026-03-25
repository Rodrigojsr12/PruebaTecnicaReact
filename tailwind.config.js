/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': '#44281d',
        'brand-peach': '#e4a788',
        'brand-yellow': '#f0e14a',
        'brand-lime': '#97ce4c',
        'brand-pink': '#e89ac7',
        'kiwi-green': '#88c23b',
        'texas-yellow': '#ebc480',
        'tardis-blue': '#043c6c',
        'calla-green': '#6b7132',
        'mystery-teal': '#a6cccc',
      }
    },
  },
  plugins: [],
}