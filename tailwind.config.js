// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-c1': '#492533',  // Add your custom hex color here
        'custom-c2': '#F0D0A6',
        'custom-c3': '#CBAE8E',
        'custom-c4': '#FEF5EC',
      },
    },
  },
  plugins: [],
}
