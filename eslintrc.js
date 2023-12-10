// .eslintrc.js
module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      'plugin:prettier/recommended', // Make sure "prettier" is the last element in this list.
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
      // Override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  };
  