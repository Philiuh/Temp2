const { Ldap } = require('../managers')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')
const R = require('ramda')
const {
  RequestsHandling: { handlePost },
  ParamsProviding: { provideBody },
  Validation: { validate },
} = require('../aspects')
const { userValidator } = require('../validators')

const signin = R.compose(
  handlePost('/api/signin'),
  provideBody,
  validate(3, userValidator),
)(
  //
  (req, res, next, { username, password }) =>
    Ldap.checkUser(username, password).then(success => {
      if (!success) {
        return res.status(401).end()
      }
      const accessToken = jwt.sign({ username, password }, JWT_SECRET)
      res.json({ accessToken })
    }),
)

module.exports = { signin }
