/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'translate-x': 'translate-x 1s ease-in-out infinite',
      },
      keyframes: {
        'translate-x': {
          '0%, 100%': { transform: 'translateX(2px)' },
          '50%': { transform: 'translateX(0px)' },
        },
      },
    },
  },
  plugins: [],
};
