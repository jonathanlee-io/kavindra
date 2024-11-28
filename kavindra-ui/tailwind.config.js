/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      /* LIGHT THEME */
      'primary': '#007bff',
      'secondary': '#6c757d',
      /* DARK THEME */
      'dark-primary': '#0069d9',
      'dark-secondary': '#495057',
    }
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-primeui'), require('@tailwindcss/forms')],
  corePlugins: { preflight: true },
}
