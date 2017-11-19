const webpack = require("karma-webpack");
module.exports = function(config) {
    config.set({
        browsers: ['Chrome', 'ChromeHeadless'],
        files: [
            {pattern: 'src/**/*.spec.js', watched: false}
        ],
        preprocessors: {
            'src/**/*.spec.js': ['webpack']
        },
        webpack: {},
        frameworks: ['jasmine'],
        webpackMiddleware: {
            stats: 'errors-only'
        },
        plugins: [
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    }
)};