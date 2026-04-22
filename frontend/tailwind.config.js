/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glossy: {
          white: '#f8fafc',
          gray: '#f1f5f9',
          shadow: 'rgba(255,255,255,0.25)'
        }
      },
      boxShadow: {
        'glossy': '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255,255,255,0.25)',
        'glow': '0 0 20px rgba(255,255,255,0.5)'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

