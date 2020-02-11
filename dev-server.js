// WEBPACK DEV SERVER ALLOWING HOT RELOAD

// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware'
// //WOUN'T FIND
// import webpackConfig from './config/babel'

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackConfig = require('./config/babel')
const webpackConfig = require('./webpack.config.js')
const webpackHotMiddleware = require('webpack-hot-middleware');


// export default (app) => {
//     const webpackCompiler = webpack(webpackConfig);

//     //use dev-middleware
//     app.use(webpackDevMiddleware(webpackCompiler, {
//         //defines the level of messages to log
//         logLevel: "warn", 
//     }));
// };

module.exports = function (app) {
            const webpackCompiler = webpack(webpackConfig);
        
            //use dev-middleware
            app.use(webpackDevMiddleware(webpackCompiler, {
                //defines the level of messages to log
                logLevel: "warn", 
            }));
        }
