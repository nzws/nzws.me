module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '@yuzulabo',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 0
  },
  env: { browser: true, node: true, es6: true }
};
