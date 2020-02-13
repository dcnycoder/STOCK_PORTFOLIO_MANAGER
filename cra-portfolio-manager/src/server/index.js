const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const db = require('./db')


const app = express()

//all middlewares: logging, static, bodyParser for axios.requests
app.use(morgan('dev'))

//FOR HOT RELOADING:
//prepare webpack compiler to use with webpack dev middleware:
const webpack = require('webpack') ;
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

//setup webpack dev middleware:
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  webpackConfig.devServer
)

app.use(webpackDevMiddleware);

//install webpack-hot-middleware:
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

app.use(webpackHotMiddleware);

//for api routes:
app.use('/api', require('./api'))

//app.use(express.static('../public'));
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//OLD:
// app.use('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// });
// app.use('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// });
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use('/stocks/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

//To handle express server 500 errors

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server Error! ')
})

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

db.sync().then(() => {
  app.listen(8080, () => {
    console.log('Listening on port 8080!')
  })
})
