const R = require('ramda')
const {
  RequestsHandling: { handlePost, addMiddleware, handleGet },
  ParamsProviding: { provide },
} = require('../aspects')
const passport = require('passport')
const { getRepository } = require('typeorm')

const addListen = R.compose(
  handlePost('/api/listens'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  provide('body', 'user'),
)(
  //
  (req, res, next, { postId: post }, { username: user }) =>
    getRepository('Listen')
      .save({ user, post })
      .then(() => res.end()),
)

const getUsersListen = R.compose(
  handleGet('/api/listens/users'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
)(
  //
  (req, res) =>
    getRepository('Listen')
      .createQueryBuilder()
      .select([
        'Listen.id as id',
        'Listen.user as username',
        'Listen.postId as postId',
        'Post.title as title',
      ])
      .leftJoin('Listen.post', 'Post')
      .orderBy('Listen.user')
      .getRawMany()
      .then(x => res.json(x)),
)

const getPostsListen = R.compose(
  handleGet('/api/listens/posts'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
)(
  //
  (req, res) =>
    getRepository('Listen')
      .createQueryBuilder()
      .select([
        'Listen.id as id',
        'Listen.postId as postId',
        'Post.title as title',
        'COUNT(Listen.postId) as `count`',
      ])
      .leftJoin('Listen.post', 'Post')
      .groupBy('Listen.postId')
      .getRawMany()
      .then(x => res.json(x)),
)

module.exports = { addListen, getUsersListen, getPostsListen }
