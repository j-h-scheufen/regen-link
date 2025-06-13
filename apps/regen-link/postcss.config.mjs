export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true, // Enable CSS nesting
        'is-pseudo-class': false, // Disable is-pseudo-class to suppress build warnings
      },
    },
  },
};
