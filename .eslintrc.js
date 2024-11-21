const { join } = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/indent': 'off', // broken rule, conflicts with prettier
  },
};
