const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/context/**/*.{ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Prompt', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}
