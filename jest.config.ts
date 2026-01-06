/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "ts", "tsx", "node"],
  rootDir: ".",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.config.ts"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "\\.svg\\?react$": "<rootDir>/mock.cjs",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/__tests__/**/*.?([mc])[jt]s?(x)",
    "**/?(*.)+(spec|test).?([mc])[jt]s?(x)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};

export default config;
