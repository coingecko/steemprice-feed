module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/(dist|build|docs|node_modules)/"],
  setupFilesAfterEnv: ["<rootDir>/jest/setup.ts"]
};
