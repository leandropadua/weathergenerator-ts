module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/*/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ['lcov', 'text', 'text-summary'],
  verbose: true,
};
