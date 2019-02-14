// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
    // Modules can be explicitly auto-mocked using jest.mock(moduleName).
    // https://facebook.github.io/jest/docs/en/configuration.html#automock-boolean
    automock: false, // [boolean]
    setupFiles: ['<rootDir>/enzyme.js', '<rootDir>/shim.js'],
    // Respect Browserify's "browser" field in package.json when resolving modules.
    // https://facebook.github.io/jest/docs/en/configuration.html#browser-boolean
    browser: false, // [boolean]

    // This config option can be used here to have Jest stop running tests after the first failure.
    // https://facebook.github.io/jest/docs/en/configuration.html#bail-boolean
    bail: false, // [boolean]

    // The directory where Jest should store its cached dependency information.
    // https://facebook.github.io/jest/docs/en/configuration.html#cachedirectory-string
    // cacheDirectory: '/tmp/<path>', // [string]

    // Indicates whether the coverage information should be collected while executing the test.
    // Because this retrofits all executed files with coverage collection statements,
    // it may significantly slow down your tests.
    // https://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean
    // collectCoverage: false, // [boolean]

    // https://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array
    collectCoverageFrom: [
        '!src/index.js',
        '!src/registerServiceWorker.js',
        '!src/api/*',
        '!src/configs/*',
        '!src/theme/*',
        'src/**/*.{js,jsx}',
        '!**/node_modules/**'
    ],

    // https://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string
    coverageDirectory: '<rootDir>/coverage', // [string]

    // coveragePathIgnorePatterns: // [array<string>]
    // coverageReporters: [], // [array<string>]
    // coverageThreshold: {}, // [object]

    globals: {
        __DEV__: true
    },

    // https://facebook.github.io/jest/docs/en/configuration.html#mapcoverage-boolean
    // mapCoverage: false, // [boolean]

    // The default extensions Jest will look for.
    // https://facebook.github.io/jest/docs/en/configuration.html#modulefileextensions-array-string
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],

    // moduleDirectories: // [array<string>]

    // A map from regular expressions to module names that allow to stub out resources,
    // like images or styles with a single module.
    moduleNameMapper: {
        '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy'
    },

    roots: ['src/components/Comments'],
    testURL: 'http://localhost/',
    // timers: // [string]
    setupTestFrameworkScriptFile: '<rootDir>/enzyme.js',

    // transformIgnorePatterns: // [array<string>]
    // unmockedModulePathPatterns: // [array<string>]

    verbose: true // [boolean]
};