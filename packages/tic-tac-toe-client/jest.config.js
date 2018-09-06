module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "graphql"],
    roots: ["<rootDir>/src"],
    setupTestFrameworkScriptFile: "./testSetup.ts",
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    transform: {
        ".+\\.(css|styl|less|sass|scss)$":
            "<rootDir>/node_modules/jest-css-modules-transform",
        ".+\\.(gql|graphql)$": "jest-transform-graphql",
        ".+\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.tsx?$": "ts-jest"
    }
};
