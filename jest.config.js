module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  roots: ['./test/unit'],
  testMatch: ['**/*.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  preset: 'ts-jest',
};
