const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');


module.exports = {
    entry: ['webpack-hot-middleware/client?reload=true', 'babel-polyfill', // enables async-await has to be the first entry
    './client/index.js'],

    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
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
            template: './src/index.html'
        })
    ]
}

