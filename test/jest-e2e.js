/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/../src/app/$1",
    "^@config/(.*)$": "<rootDir>/../src/config/$1",
    "^@database/(.*)$": "<rootDir>/../src/database/$1",
    // "^@auth/(.*)$": "<rootDir>/../src/auth/$1",
    "^@users/(.*)$": "<rootDir>/../src/users/$1",
  },
  preset: "ts-jest",
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testEnvironment: "node",
  roots: ["<rootDir>/", "<rootDir>/../src"],
  testRegex: ".*\\.e2e-spec\\.ts$",
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)",
    "<rootDir>/dist/(?!@foo)"
  ],
  maxWorkers: '50%'
} 