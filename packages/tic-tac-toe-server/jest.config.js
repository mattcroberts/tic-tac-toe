module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    roots: ["<rootDir>/src"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
};
