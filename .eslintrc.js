module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': 'off',
    'quote-props': 'off',
    'max-len': [2, { code: 80 }],
    'function-paren-newline': 'off',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
