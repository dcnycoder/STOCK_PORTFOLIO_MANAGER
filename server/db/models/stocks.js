Sequelize = require('sequelize')
const db = require('../db')

const Stocks = db.define('stocks', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  currentPrice: {
    type: Sequelize.INTEGER
    //allowNull: false,
  },
  timeSeries: {
    //type: Sequelize.ARRAY(Sequelize.DECIMAL),
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
})

module.exports = Stocks
