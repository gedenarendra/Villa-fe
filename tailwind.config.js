/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#1A1A1A',
        'cream': '#F7F7F6',
        'bronze': '#A68B67', // Adding a bronze accent often found in minimal luxury
        'gray-medium': '#777777',
        'white-pure': '#FFFFFF',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.1em',
        'tighter-plus': '-0.04em',
      },
      lineHeight: {
        'tight-extra': '0.9',
      }
    },
  },
  plugins: [],
}