/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        spaceCadet: "#25344F",
        slateGray: "#617891",
        Tan: "#D5B893",
        Coffee: "#6F4D38",
        Maroon: "#632024",
        offWhite: "#FFFDF5",
        navyBlue: "#1B2452",
      },

      fontFamily: {
        kalnia: ['"Kalnia"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

