module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    semi: 'off',
    'import/extensions': 0,
    'no-tabs': 0,
  },
};
