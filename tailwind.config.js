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
        violet50: 'rgba(178, 155, 199, 0.5)',
        violet20: 'rgba(178, 155, 199, 0.2)',
        pink: '#F574A3',
        pink50: 'rgba(245, 116, 163, 0.5)',
        pink25: 'rgba(245, 116, 163, 0.25)',
        sport: {
          background: '#000000',
          navigationButton: '#FFFFFF',
          headerText: '#FF2B6B',
          monthText: '#C1FF72',
          defaultText: '#FFFFFF',
          dayCircles: '#C1FF72',
        },
        sugar: {
          background: '#F574A3',
          navigationButton: '#FFFFFF',
          headerText: '#FFCC00',
          monthText: '#FFFFFF',
          defaultText: '#FFFFFF',
          dayCircles: '#FFCC00',
        },
        sleep: {
          background: '#F574A3',
          navigationButton: '#FFFFFF',
          headerText: '#FFCC00',
          monthText: '#FFFFFF',
          defaultText: '#FFFFFF',
          dayCircles: '#FFCC00',
        },
        water: {
          background: '#A0C2D1',
          navigationButton: '#FFFFFF',
          headerText: '#007C81',
          monthText: '#FFFFFF',
          defaultText: '#FFFFFF',
          dayCircles: '#007C81',
        },
        language: {
          background: '#F574A3',
          navigationButton: '#FFFFFF',
          headerText: '#FFCC00',
          monthText: '#FFFFFF',
          defaultText: '#FFFFFF',
          dayCircles: '#FFCC00',
        },
        other: {
          background: '#B29BC7',
          navigationButton: '#FFFFFF',
          headerText: '#D3FC4C',
          monthText: '#FFFFFF',
          defaultText: '#FFFFFF',
          dayCircles: '#D3FC4C',
        },
      },
      rotate: {
        270: '270deg',
      },
      fontFamily: {
        monospace: ['Source Code Pro', 'monospace'],
      },
      fontSize: {
        S: '14px',
        M: '20px',
        L: '24px',
        XL: '26px',
        XXL: '32px',
      },
      gap: {
        XS: '6px',
        S: '8px',
        M: '12px',
        L: '24px',
      },
      spacing: {
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        36: '36px',
        48: '48px',
        64: '64px',
        96: '96px',
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        20: '20px',
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
