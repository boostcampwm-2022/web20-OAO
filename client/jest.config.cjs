/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: {
    '^@todo/(.+)$': '<rootDir>/src/core/todo/$1',
    '^@repository/(.+)$': '<rootDir>/src/core/repository/$1',
  },
};
