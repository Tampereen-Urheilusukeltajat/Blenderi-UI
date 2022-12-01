module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js, playwright.config.js'],
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
    'multiline-ternary': 'off', // Conflicts with prettier
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      { allowNullableObject: true, allowNumber: true, allowString: true },
    ],
    '@typescript-eslint/indent': 'off',
  },
};
