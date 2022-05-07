import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        "^src(.*)$": "<rootDir>/src$1",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    },
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "vue"
    ],
    transform: {
        ".*\\.(vue)$": "@vue/vue3-jest",
        "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: "jsdom",
    // preset: 'ts-jest',
    collectCoverage: true,
    setupFiles: [
        "<rootDir>/tests/setup.ts"
    ]
};
export default config;
