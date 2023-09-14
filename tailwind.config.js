/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "cream": "#FFFAF5"
      }
    },
    spacing: {
      '0': '0px',
      '1/2': '4px',
      '1': '8px',
      '1.5': '12px',
      '2': '16px',
      '2.5': '20px',
      '3': '24px',
      '4': '32px',
      '5': '40px',
      '6': '48px',
      '7': '56px',
      '8': '64px',
      '9': '72px',
      '10': '80px',
      '20': '160px',
      '40': '240px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

