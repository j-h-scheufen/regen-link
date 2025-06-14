import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens, // 'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-figtree)', 'var(--font-sora)'],
      },
    },
  },
  darkMode: 'class',
};
