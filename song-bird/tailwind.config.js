/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './src/html/**/**/**/*.html',
  './src/**/**/**/*.{js,jsx,ts,tsx,vue}',
],
  theme: {
    extend: {
      rotate: {
        '360': '360deg',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};