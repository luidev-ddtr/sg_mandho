// postcss.config.cjs
const path = require('path');

module.exports = {
  from: path.resolve(__dirname, 'src/css/style.css'), // Ruta absoluta al archivo CSS principal
  plugins: {
     '@tailwindcss/postcss': {} // ✅ Plugin oficial para Tailwind v3.3+
  }
};