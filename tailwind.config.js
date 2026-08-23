/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        paytone: ['"Paytone One"', "sans-serif"],
      },
      colors: {
        red: {
          110: "#DD2744",
          120: "#B3B3B3",
          130: "#EBEBEB",
          140: "#BABABA",
          150: "#FFC700",
          160: "#DADADA",
          170: "#F1F1F1",
          180: "#D2D2D2",
          190: "#C8C8C8",
          210: "#F4F4F4",
          220: "#DBD7F4",
          230: "#F7F7FC",
        },
      },
    },
  },
  plugins: [],
};
