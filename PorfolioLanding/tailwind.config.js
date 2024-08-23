/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './views/**/*.{html,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px'
      }

    },
  },
  plugins: [],
}

