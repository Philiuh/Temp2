const R = require('ramda')
const {
  RequestsHandling: { handlePost, handleGet, addMiddleware },
  ParamsProviding: { provideBody },
  Validation: { validate },
} = require('../aspects')
const { mailValidator } = require('../validators')
const { getRepository } = require('typeorm')
const passport = require('passport')

const addMail = R.compose(
  handlePost('/api/mails'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  provideBody,
  validate(3, mailValidator),
)(
  //
  (req, res, next, mail) =>
    getRepository('Mail')
      .save({ ...mail, user: req.user.username })
      .then(() => res.status(201).end()),
)

const getMails = R.compose(
  handleGet('/api/mails'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
)(
  //
  (req, res) =>
    getRepository('Mail')
      .find({ order: { id: 'DESC' } })
      .then(mails => res.json(mails)),
)

const download = R.compose(
  handleGet('/api/mails/download'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
)(
  //
  (req, res) =>
    getRepository('Mail')
      .find({ order: { id: 'DESC' } })
      .then(mails => {
        const csvFileBody = mails.reduce(
          (value, mail) =>
            value +
            '\n' +
            R.pipe(
              R.values,
              R.join(','),
            )(mail),
          'id,title,message,user',
        )
        res.setHeader(
          'Content-disposition',
          'attachment; filename=feedback.csv',
        )
        res.set('Content-Type', 'text/csv')
        res.status(200).send(csvFileBody)
      }),
)

module.exports = { addMail, getMails, download }
