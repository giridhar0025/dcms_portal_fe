const colors = require('./theme/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './theme/**/*.{js,ts}'],
  theme: {
    extend: {
      colors
    }
  },
  plugins: []
};
