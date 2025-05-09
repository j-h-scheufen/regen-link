module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true, // Enable CSS nesting
      },
    },
  },
};
