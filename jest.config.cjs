// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^node-fs-storage$': '<rootDir>/src',
  },
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        importHelpers: false,
      },
    },
  },
}

module.exports = config
