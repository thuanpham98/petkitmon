/** @type {import('postcss').Postcss} */
export default {
  plugins: {
    "postcss-preset-env": {},
    autoprefixer: {
      supports: true,
    },
  },
};

