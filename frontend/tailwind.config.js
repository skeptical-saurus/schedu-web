const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Kanit', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}
