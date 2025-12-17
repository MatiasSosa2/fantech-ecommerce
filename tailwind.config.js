/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        navy: "#003366",
        cyan: "#00AEEF",
        graylight: "#F7F7F7",
      },
      boxShadow: {
        blueGlow: "0 0 18px rgba(0,174,239,0.20)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
