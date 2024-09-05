import cypress from 'eslint-plugin-cypress';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends('plugin:chai-friendly/recommended'),
  {
    plugins: {
      cypress,
      'chai-friendly': chaiFriendly
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/no-async-before': 'error',
      'cypress/no-pause': 'error',
      'no-unused-expressions': 0,
      'chai-friendly/no-unused-expressions': 2,

      'array-bracket-newline': [
        'error',
        {
          minItems: 2
        }
      ],

      'array-bracket-spacing': [
        'error',
        'never'
      ],

      'array-element-newline': [
        'error',
        {
          ArrayExpression: 'always',

          ArrayPattern: {
            minItems: 1
          }
        }
      ],

      'block-spacing': 'error',

      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true
        }
      ],

      'comma-dangle': [
        'error',
        'never'
      ],

      'comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],

      'comma-style': [
        'error',
        'last'
      ],
      curly: 'error',
      'dot-location': [
        'error',
        'property'
      ],
      'eol-last': [
        'error',
        'always'
      ],
      eqeqeq: 'off',
      'func-call-spacing': [
        'error',
        'never'
      ],
      'function-call-argument-newline': [
        'error',
        'never'
      ],
      'function-paren-newline': [
        'error',
        'never'
      ],

      'key-spacing': [
        'error',
        {
          mode: 'strict'
        }
      ],

      'keyword-spacing': [
        'error',
        {
          overrides: {
            import: {
              after: true
            },

            from: {
              before: true,
              after: true
            },

            if: {
              after: true
            },

            for: {
              after: true
            },

            while: {
              after: true
            }
          }
        }
      ],

      'newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 2
        }
      ],

      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: {
            minProperties: 3
          }
        }
      ],

      'object-curly-spacing': [
        'error',
        'always',
        {
          arraysInObjects: false,
          objectsInObjects: true
        }
      ],

      quotes: [
        'error',
        'single'
      ],
      semi: [
        'error',
        'always'
      ],
      'semi-spacing': 'error'
    }
  }
];