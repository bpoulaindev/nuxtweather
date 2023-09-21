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
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      colors: {
        cream: "#FFFAF5",
        mint: "#68969C",
      },
      screens: {
        xs: "400px",
      },
      fontFamily: {
        literata: ["Literata", "serif"],
        literataItalic: ["Literata Italic", "serif", "italic"],
        sentient: ["Sentient", "serif"],
      },
      fontSize: {
        "10xl": [
          "10rem",
          {
            lineHeight: "1",
          },
        ],
      },
    },
    spacing: {
      0: "0px",
      0.25: "2px",
      "1/2": "4px",
      0.5: "4px",
      1: "8px",
      1.5: "12px",
      2: "16px",
      2.5: "20px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      12: "96px",
      14: "112px",
      16: "128px",
      18: "144px",
      20: "160px",
      40: "240px",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
