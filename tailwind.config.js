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
      fontFamily: {
        monospace: ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [],
}
