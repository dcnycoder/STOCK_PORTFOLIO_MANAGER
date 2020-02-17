
const router = require('express').Router()
const axios = require('axios')
const {Stocks} = require('../db/models/')
const {alphaVantage} = require('../../keys')


//GET SINGLE STOCK
router.get('/:ticker', async (req, res, next) => {
  console.log('single stock api route reached!')
  console.log('req.params.ticker: ', req.params.ticker);
  try {
    const result = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
      req.params.ticker
    }&interval=5min&apikey=${alphaVantage}`);

    const singleStockPrices = result.data;//["Time Series (5min)"];
    //console.dir(`singleStockPrices: ${singleStockPrices["Time Series (5min)"]["2020-02-14 16:00:00"]["1. open"]}`);

    console.log("singleStockPrices: ", singleStockPrices);
    res.send(singleStockPrices);
  } catch (err) {
    console.log("Error getting a single stock info from the Alphavantage API: ", err);
    next(err);
  }
})

// router.put('/stocks', (req, res, next) => {
// })

//GETS ALL STOCKS ON THE FRONTPAGE:
//Thunk that gets the stocks: const {data} = await axios.get('/api/stocks');
router.get('/', async function(req, res, next) {
  try {
    console.log("You've successfully reached the stocks route!")
    //console.log("keys: ", keys);
    console.log('alphaVantage: ', alphaVantage)
    let tickers = await Stocks.findAll({
      attributes: ['ticker']
    })

    //console.log('got all stocks from db: ', tickers)
    //return the await of the map somehow

    //map through tickers and return array of promises to pass to Promise.all
    let stockPromises = tickers.map(async function(stock) {
      let result = axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
          stock.ticker
        }&interval=5min&apikey=${alphaVantage}`
      )
      //console.log("result in axios get all stocks: ", result)
      return result.data;
      //res.send(result);
    })

    //let stockPrices = await stockPromises[0];
    let stockPrices = await Promise.all(stockPromises);
    console.log("resolved promises in get all stocks: ", stockPrices);

    // Stockprices is an array of resolved promise resuls, everyone of which has it's own data property.
    //console.log("stockPrices[0].data Sample: ", stockPrices[0].data)

    let result = stockPrices.reduce((acc, resolvedPromise) => {
      //sconsole.log('resolvedPromise: ', resolvedPromise.data);
      let stock = {}
      // let lastClose = stock['Time Series (5min)'][intervals[0]]['4. close'];
      // acc[resolvedPromise['Meta Data']['2. Symbol']] = resolvedPromise['Time Series (5min)'][intervals[0]]['4. close'];
      let intervals = Object.keys(resolvedPromise.data['Time Series (5min)'])
      stock.ticker = resolvedPromise.data['Meta Data']['2. Symbol']
      stock.price = Number(
        resolvedPromise.data['Time Series (5min)'][intervals[0]]['4. close']
      ).toFixed(2)

      acc.push(stock)
      console.log('acc: ', acc)
      return acc
    }, [])
    //DELETE BELOW:

    //return object with tickers and prices:
    //Object.keys(stockPrices)
    stockPrices = stockPrices.map(async stock => {
      //console.log("stock.data sample: ", stock.data);
      stock = stock.data
      //console.log('stock: ', stock)
      let intervals = Object.keys(stock['Time Series (5min)'])
      //Here I should populate the timeSeries db
      //first create the array of {time: price} objects
      let timeSeries = []
      for (let key in intervals) {
        //console.log("key: ", key);
        timeSeries.push({key: intervals[key]})
      }

      //console.log("stock['Meta Data']['2. Symbol']: ", stock['Meta Data']['2. Symbol']);

      let newStocks = await Stocks.update(
        {timeSeries: timeSeries},
        {
          where: {
            ticker: stock['Meta Data']['2. Symbol']
          }
        }
      )
      //console.log('newStocks: ', newStocks);

      //console.log("stock after update: ", stock);

      //console.log('intervals: ', intervals)
      let lastClose = stock['Time Series (5min)'][intervals[0]]['4. close']

      console.log('lastClose: ', lastClose)

      //insert lastClose in the stocks db?

      //console.log("lastClose: ", lastClose)
      return lastClose
    }) //end of stockPrices array; Seems like stockPrices is populated with last prices.

    //console.log('new stockPrices: ', stockPrices)

    //console.log("tickers: ", tickers);
    let stocks = tickers.map((elem, index) => {
      //console.log('index: ', index);
      //console.log('elem: ', elem);
      //console.log("stockPrices[index].data: ", stockPrices[index].data);
      return {
        ticker: elem.ticker
        //currentPrice: parseFloat(stockPrices[index].data)
        //currentPrice: lastClose,
      }
    })

    //console.log('refined stocks: ', stocks)
    //res.send(stocks)
    res.send(result)
  } catch (err) {
    console.log('Error has occured while getting all stocks: ', err)
    next(err)
  }
})

module.exports = router
