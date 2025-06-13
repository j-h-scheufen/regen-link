// hero.ts
import { heroui } from '@heroui/react';

export default heroui({
  defaultTheme: 'dark',
  themes: {
    dark: {
      colors: {
        background: '#030712',
        primary: {
          DEFAULT: '#79D91F',
          50: '#4A9107',
          100: '#4F960D',
          200: '#59A116',
          300: '#66AE23',
          400: '#71B92E',
          500: '#7DC639',
          600: '#8FD84B',
          700: '#A3E664',
          800: '#B7F180',
          900: '#D3FAAE',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#aa825c',
          50: '#15100b',
          100: '#2a2117',
          200: '#55412e',
          300: '#947251',
          400: '#aa825c',
          500: '#bf9368',
          600: '#d8ac81',
          700: '#e1bf9d',
          800: '#ead1b9',
          900: '#f2e3d5',
          foreground: '#000000',
        },
      },
    },
    light: {
      colors: {
        background: '#f9fafb',
        primary: {
          DEFAULT: '#7FD92A',
          50: '#1F3A06',
          100: '#2D520A',
          200: '#3E6F11',
          300: '#538F1B',
          400: '#69AE29',
          500: '#7DC639',
          600: '#8FD84B',
          700: '#A3E664',
          800: '#B7F180',
          900: '#D3FAAE',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#D4A373',
          50: '#15100b',
          100: '#2a2117',
          200: '#55412e',
          300: '#947251',
          400: '#aa825c',
          500: '#bf9368',
          600: '#d8ac81',
          700: '#e1bf9d',
          800: '#ead1b9',
          900: '#f2e3d5',
          foreground: '#000000',
        },
      },
    },
  },
});
