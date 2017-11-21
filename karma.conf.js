const webpack = require("karma-webpack");

module.exports = config => {
    config.set({
        browsers: ['ChromeHeadless'],
        files: [
            {pattern: 'src/**/*.spec.js', watched: true}
        ],
        preprocessors: {
            'src/**/*.spec.js': ['webpack']
        },
        webpack: require('./config/webpack.config.test'),
        frameworks: ['jasmine'],
        webpackMiddleware: {
            stats: 'errors-only'
        },
        plugins: [
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-jasmine'
        ],
    }
)};
