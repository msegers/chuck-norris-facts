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
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: "file?name=[name].[ext]" }
        ]
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