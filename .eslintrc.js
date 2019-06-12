module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true,
    es6: true
  }
};
