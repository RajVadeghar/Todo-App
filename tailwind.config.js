module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    letterSpacing: {
      widest: ".55em",
    },
    extend: {},
  },
  variants: {
    extend: {
      // textOpacity: ["dark"],
    },
  },
  plugins: [],
};
