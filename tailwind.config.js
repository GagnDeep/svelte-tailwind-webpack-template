const colors = require('tailwindcss/colors')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.svelte', './src/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      teal: colors.teal,
      blue: colors.blue,
      green: colors.green,
      pink: colors.pink,
      cyan: colors.cyan,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
