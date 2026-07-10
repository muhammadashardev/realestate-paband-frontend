/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#112338',     // The dark blue from footer/sections
          gold: '#B68B39',     // The gold/mustard from buttons
          light: '#F8F3EA',    // The light cream background
          white: '#FFFFFF',
          text: '#222222',
          muted: '#666666'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

