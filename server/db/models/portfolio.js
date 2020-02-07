const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  cash: {
    type: Sequelize.INTEGER
  },
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Portfolio
