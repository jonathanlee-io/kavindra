/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      /* LIGHT THEME */
      'light-primary': '#c0d2e5',
      'light-secondary': '#6c757d',
      /* DARK THEME */
      'dark-primary': '#052c59',
      'dark-secondary': '#495057',
    }
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-primeui'), require('@tailwindcss/forms')],
  corePlugins: { preflight: true },
}
