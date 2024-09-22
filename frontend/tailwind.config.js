/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#d2d5d8',
        'primary-highlight': '#bcc0c4',
        'secondary': '#111d4a',
        'secondary-highlight': '#0e163b',
        'tertiary': '#4a90e2',
        'tertiary-highlight': '#377bc4',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

