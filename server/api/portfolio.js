const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send("You've successfully reached the portfolio route!")
})

module.exports = router
