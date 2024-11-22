/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFAFA',
        red: '#FF2B6B',
        green: '#C1FF72',
        blue: '#37F0F7',
        background: '#F1EBF5',
        black: '#3A3341',
        violet: '#B29BC7',
        violet20: 'rgba(178, 155, 199, 0.2)',
        pink: '#F574A3',
        pink25: 'rgba(245, 116, 163, 0.25)',
      },
      rotate: {
        270: '270deg',
      },
      fontFamily: {
        monospace: ['Source Code Pro', 'monospace'],
      },
      keyframes: {
        shakes: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '10%': {
            transform: 'rotate(5deg)',
          },
          '20%': {
            transform: 'rotate(-5deg)',
          },
          '30%': {
            transform: 'rotate(5deg)',
          },
          '40%': {
            transform: 'rotate(-5deg)',
          },
          '50%': {
            transform: 'rotate(5deg)',
          },
          '60%': {
            transform: 'rotate(-5deg)',
          },
          '70%': {
            transform: 'rotate(5deg)',
          },
          '80%': {
            transform: 'rotate(-5deg)',
          },
          '90%': {
            transform: 'rotate(5deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
