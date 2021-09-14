const { resolve } = require('path');

module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: [resolve(__dirname, './tsconfig.json'), resolve(__dirname, './tsconfig-test.json')],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },

  env: {
    node: true,
  },

  extends: [
    'eslint:recommended',

    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'prettier',
  ],

  plugins: ['@typescript-eslint', 'prettier', 'ts-immutable', 'folders', 'import', 'filenames'],

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',

    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': false,
        'ts-nocheck': false,
        'ts-check': false,
        minimumDescriptionLength: 15,
      },
    ],

    //not required, as Promises should always only return an `Either`
    '@typescript-eslint/no-floating-promises': 'off',

    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],

    //ts-immutable
    'ts-immutable/no-throw': 'error',
    'ts-immutable/no-reject': 'error',
    'ts-immutable/immutable-data': ['error', { ignoreAccessorPattern: 'module' }], //allow setting `module.exports`

    'folders/match-regex': [2, '^[a-z][a-z-]+$', '/src/'],

    'import/no-default-export': 2,
    'import/no-relative-parent-imports': 'error',

    'filenames/match-exported': 2,

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },

      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow', //to skip "unused parameter" ts error
        trailingUnderscore: 'forbid',
      },

      {
        selector: 'memberLike',
        modifiers: ['static'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },

      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },

      {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
};
