/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      background: 'hsl(var(--background))',
      text: 'hsl(var(--text))',
      card: 'hsl(var(--card))',
    },
    fontFamily: {

    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}