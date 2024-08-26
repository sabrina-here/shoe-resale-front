/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    // colors: {
    //   primary: "#FF69B4",
    //   secondary: "#FEC5E5",
    //   rose: "#FC94AF",
    //   hotpink: "#FF1694",
    //   accent: "#404040",
    // },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "valentine"],
  },
};
