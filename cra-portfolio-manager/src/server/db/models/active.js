//DONE:
const Sequelize = require('sequelize')
const db = require('../db')

const Active = db.define('active', {
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
  dateListed: {
    type: Sequelize.DATE
  }
})

module.exports = Active
