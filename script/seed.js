'use strict'

const db = require('../server/db')
const {Stocks} = require('../server/db/models')

const tickers = [
  'mmm',
  'axp',
  'aapl'
  // 'ba',
  // 'cat',
  // 'cvx',
  // 'csco',
  // 'ko',
  // 'dis',
  // 'dow',
  // 'xom',
  // 'gs',
  // 'hd',
  // 'ibm',
  // 'intc',
  // 'jnj',
  // 'jpm',
  // 'mcd',
  // 'mrk',
  // 'mcd',
  // 'mrk',
  // 'msft',
  // 'nke',
  // 'pfe',
  // 'pg',
  // 'trv',
  // 'utx',
  // 'unh',
  // 'vz',
  // 'v',
  // 'wmt',
  // 'wba'
]

console.log('Stocks: ', Stocks)
const stockPromises = tickers.map(ticker => {
  let stock = {
    ticker: '',
    currentPrice: null
  }
  stock.ticker = ticker
  //stock.price = null;

  //const stockObject = Stocks.create(stock);
  //console.log("stock object: ", stockObject);
  return stock
})
//console.log("stockPromises: ", stockPromises);

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //should I use bulkCreate?
  // const users = await Promise.all(
  //   // [
  //   // User.create({email: 'cody@email.com', password: '123'}),
  //   // User.create({email: 'murphy@email.com', password: '123'})
  //   // ]
  //   stockPromises
  // )
  //await Stocks.create({ticker: 'IBM', currentPrice: 100});
  await Stocks.bulkCreate(stockPromises)

  //console.log(`seeded ${stockPromises.length} stocks`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
