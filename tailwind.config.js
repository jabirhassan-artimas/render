/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C5A059', // Refined Heritage Gold
          dark: '#A68341',
          light: '#DEBB61',
        },
        dark: {
          DEFAULT: '#1A1814', // Rich Onyx
          soft: '#2D2922',
          charcoal: '#3E3930',
        },
        heritage: {
          cream: '#F5F0E2', // Warm Heritage Cream
          silk: '#EDE5C8',  // Light Silk
          sand: '#DFC98A',  // Golden Sand
          gold: '#C9A84C',  // Rich Heritage Gold
          clay: '#4A3728',
          paper: '#FDFCF8', // Very light off-white paper
        },
        accent: {
          red: '#8B0000', // Deep Madder
          brown: '#5D4037',
        }
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(139, 69, 19, 0.15)',
        'minimal': '0 4px 20px rgba(28, 24, 14, 0.05)',
        '3xl': '0 35px 60px -15px rgba(0,0,0,0.3)',
      },
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
