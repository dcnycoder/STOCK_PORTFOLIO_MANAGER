import axios from 'axios'
//import Stocks from

const GET_STOCKS = 'GET_STOCKS'
const GET_STOCK = 'GET_STOCK'

const initialState = []

const getStocks = stocks => {
  return {
    type: GET_STOCKS,
    stocks: stocks
  }
}

export const getStocksThunk = dispatch => {
  console.log('getStocksThunk called!')
  return async dispatch => {
    //get all the stocks from db in the form of array
    //and call the whole array from AlphaVantage
    const {data} = await axios.get('/api/stocks')
    console.log('tickers array: ', data)
    dispatch(getStocks(data))
  }
}

const getStock = (ticker, data) => {
  console.log('getStock dispatched!')
  return {
    type: GET_STOCK,
    ticker: ticker,
    data: data
  }
}

export const getStockThunk = ticker => {
  console.log('getStockThunk called!')
  return async dispatch => {
    try {
      console.log('ticker: ', ticker)
      const result = await axios.get(`api/stocks/${ticker}`)
      console.log('result in getStockThunk: ', result)
      console.log('data in getStockThunk: ', data)
      dispatch(getStock(ticker, data))
    } catch (error) {
      console.log('error in getStockThunk!')
    }
    //dispatch(getStock())
  }
}

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks
    case GET_STOCK:
      return [action.data]
    default:
      return state
  }
}

export default stockReducer
