const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', // enables async-await has to be the first entry
    './client/index.js'],

    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "public",
        overlay: true,
        hot: true,
        stats: {
            colors: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

    ]
}

