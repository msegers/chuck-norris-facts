const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/, use: 'vue-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html')
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};