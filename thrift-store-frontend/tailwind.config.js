module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      outline: {
        blue: "2px solid #3b82f6",
        "blue-4": "4px solid #3b82f6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
  important: true,
};
