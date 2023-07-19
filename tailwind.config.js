/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brandColor: '#e44f51'
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs")
  ]
}

