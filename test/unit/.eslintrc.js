module.exports = {
  root: false,
  extends: ['plugin:jest/all'],

  rules: {
    'jest/valid-title': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/consistent-test-it': [
      'error',
      {
        fn: 'test',
        withinDescribe: 'test',
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'test',
        property: 'each',
        message: 'Please use `[...].forEach((each) => { test(...) });` instead, as `test.each` is not typed.',
      },
    ],
  },
};
