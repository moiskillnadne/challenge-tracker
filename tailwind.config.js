/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#FF2B6B',
        green: '#C1FF72',
        blue: '#37F0F7',
      },
      fontFamily: {
        monospace: ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [],
};
