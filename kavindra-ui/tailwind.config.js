/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      /* LIGHT THEME */
      'light-primary': '#f1f4f8',
      'light-secondary': '#64737a',
      'light-text-primary': '#000000',
      'light-blue': '#007bff',
      /* DARK THEME */
      'dark-primary': '#001631',
      'dark-secondary': '#596570',
      'dark-text-primary': '#FFFFFF',
      'dark-blue': '#007bff',
    }
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-primeui'), require('@tailwindcss/forms')],
  corePlugins: { preflight: true },
}
