import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/.eslintrc.js',
      '**/playwright.config.js',
      '**/node_modules',
      '**/build',
      '**/public',
      '**/*.config.*',
      '**/.eslintrc.js',
      '**/vite.config.ts',
      '**/vite-env.d.ts',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'eslint-config-love',
      'plugin:react-hooks/recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

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
      'multiline-ternary': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableObject: true,
          allowNumber: true,
          allowString: true,
          allowNullableString: true,
        },
      ],

      '@typescript-eslint/indent': 'off',
      'no-trailing-spaces': 'warn',
      'no-undef': 'off',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
