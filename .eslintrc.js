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
    'max-len': [2, { code: 100 }],
    'function-paren-newline': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
