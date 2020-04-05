module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverage: true,
  coverageReporters: ["html", "lcov", "text"],
  testRegex: "(spec|test).ts$",
  rootDir: ".",
  verbose: true,
};
