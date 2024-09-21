/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-colour': '#a3cde3',
        'theme-hover-colour': '#8abbd4'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

