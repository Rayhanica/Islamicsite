module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#d4af37", // Custom gold color
          600: "#c29b29", // Custom darker gold color
        },
        darkgreen: {
          500: "#006400", // Dark green for Islamic theme
          600: "#004d00", // Slightly darker green
        },
      },
      fontFamily: {
        serif: ['Amiri', 'serif'], // Islamic-inspired font
      },
      backgroundImage: {
        'islamic-pattern': "url('/path/to/your/pattern.jpg')", // Optional: Custom background
      },
    },
  },
  plugins: [],
};




