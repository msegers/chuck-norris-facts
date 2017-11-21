if (process.env.NODE_ENV === 'dev') {
    module.exports = require('./config/webpack.config.dev.js');
} else if (process.env.NODE_ENV === 'test') {
    module.exports = require('./config/webpack.config.test.js')
} else {
    console.error("NO valid NODE_ENV set");
    console.error(process.env.NODE_ENV);
}