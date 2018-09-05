module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        ".+\\.(gql|graphql)$": "jest-transform-graphql",
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss)$":
            "<rootDir>/node_modules/jest-css-modules-transform",
        ".+\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "graphql"],
    setupTestFrameworkScriptFile: "./testSetup.ts",
    snapshotSerializers: ["enzyme-to-json/serializer"]
};
