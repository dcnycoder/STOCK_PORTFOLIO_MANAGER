const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/portfolioManager', {
  // host: 'localhost',
  // dialect: 'postgres',
  logging: false
})

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
