module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': 0,
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    semi: 'off',
    'no-unused-expressions': 0,
    'no-tabs': 0,
    'no-useless-escape': 0,
    'import/extensions': 0,
    'no-restricted-globals': 0
  }
};
