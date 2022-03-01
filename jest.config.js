/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  resetMocks: true,
  clearMocks: true,
  resetModules: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverage: true,
};
