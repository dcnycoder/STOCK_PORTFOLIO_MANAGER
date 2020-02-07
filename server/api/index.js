const router = require('express').Router()

//router.use('/active', require('./active.js'));
router.use('/stocks/', require('./stocks'))

//for 404 handling:
router.use((err, req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(err)
})

module.exports = router
