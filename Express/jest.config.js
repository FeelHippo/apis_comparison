const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    '\\.ts$': ['ts-jest'],
  },
  transformIgnorePatterns: ['node_modules/(?!mongodb)'],
};
