import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!jest.config.ts",
  ],
};
export default config;
