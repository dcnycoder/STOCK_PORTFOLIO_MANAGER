//DONE:
const Sequelize = require('sequelize')
const db = require('../db')

const Sold = db.define('sold', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  squareFootage: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  dateSold: {
    type: Sequelize.DATE
  }
})

module.exports = Sold
