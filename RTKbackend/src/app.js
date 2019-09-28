const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const { createConnection } = require('typeorm')
const { removeUnusedFiles } = require('./utils')
const controllers = require('./controllers')
const R = require('ramda')
require('./auth-strategies')

createConnection()
const app = express()

app.use('/files', express.static('files'))
app.use(bodyParser.json({}))
app.use(passport.initialize())

R.pipe(
  R.values,
  R.chain(R.values),
  R.forEach(x => x(app)),
)(controllers)

app.listen(3000, () => {
  // eslint-disable-next-line
  console.log('Server is listening on port 3000')
})

setInterval(removeUnusedFiles, 15 * 60 * 1000)
