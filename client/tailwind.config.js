/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        menu: 'cubic-bezier(0.5, 0, 0.5, 1)',
        menuFast: 'cubic-bezier(0.85, 0, 0.15, 0)',
      },
      colors: {
        spotify: {
          DEFAULT: '#1DB954',
          dark: '#1ed760',
        },
      },
      animation: {
        'fold-in': 'fold .5s linear',
      },
      keyframes: {
        fold: {
          '0%': { transform: 'scale(0, .025)' },
          '50%': { transform: 'scale(1, .025)' },
        },
      },
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  daisyui: {
    styled: true,
    themes: ['valentine', 'synthwave'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'synthwave',
  },
};
