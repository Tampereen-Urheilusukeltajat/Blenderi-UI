module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'standard-with-typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'playwright.config.ts'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  rules: {
    'no-console': 'warn',
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'never'],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
  },
};
