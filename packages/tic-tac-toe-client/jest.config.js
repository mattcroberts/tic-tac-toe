module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
