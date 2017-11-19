if (process.env.NODE_ENV === 'dev') {
    require('config/webpack.config.dev.js')
} else if (process.env.NODE_ENV === 'test') {
    require('config/webpack.config.test.js')
}