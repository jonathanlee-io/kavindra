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
      'light-text-primary': '#000000',
      /* DARK THEME */
      'dark-primary': '#052c59',
      'dark-secondary': '#92a0a9',
      'dark-text-primary': '#FFFFFF',
    }
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-primeui'), require('@tailwindcss/forms')],
  corePlugins: { preflight: true },
}
