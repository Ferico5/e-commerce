module.exports = {
  testEnvironment: "node",
  setupFiles: ["./__tests__/setup/env.js"],
  testMatch: ["**/__tests__/**/*.test.js"],
  verbose: true,
  testTimeout: 20000,
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
};
