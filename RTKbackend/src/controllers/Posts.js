const { promises: fs } = require('fs')
const { getRepository } = require('typeorm')
const {
  RequestsHandling: {
    handlePost,
    handleGet,
    handleDelete,
    handlePut,
    addMiddleware,
  },
  ParamsProviding: { provideParams, provide },
} = require('../aspects')
const R = require('ramda')
const multer = require('multer')
const passport = require('passport')
const { getFileExtension } = require('../utils')
const moment = require('moment')

const upload = multer({ dest: 'files/' })

const createPost = R.compose(
  handlePost('/api/posts'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  addMiddleware(upload.array('file')),
  provide('body', 'files'),
)(
  //
  async (req, res, next, post, [audio, image]) => {
    if (audio.mimetype !== 'audio/mpeg' && audio.mimetype !== 'audio/mp3') {
      return res.status(400).json({
        mimetype: 'Неверный формат аудио',
      })
    }

    const newAudioPath = `${audio.destination}${
      audio.filename
    }.${getFileExtension(audio.originalname)}`

    let newImagePath = ''

    if (image) {
      newImagePath = `${image.destination}${image.filename}.${getFileExtension(
        image.originalname,
      )}`

      await fs.rename(image.path, newImagePath)
    }

    const postsRepository = getRepository('Post')
    await fs.rename(audio.path, newAudioPath)

    await postsRepository.save({
      ...post,
      url: newAudioPath,
      image: newImagePath,
    })
    res.status(201).send()
  },
)

const deletePost = R.compose(
  handleDelete('/api/posts/:id'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  provideParams,
)(
  //
  async (req, res, next, { id }) => {
    const postsRepository = getRepository('Post')
    const likeRepository = getRepository('Like')
    const listenRepository = getRepository('Listen')

    await likeRepository
      .createQueryBuilder()
      .delete()
      .where('postId = :id', { id })
      .execute()

    await listenRepository
      .createQueryBuilder()
      .delete()
      .where('postId = :id', { id })
      .execute()

    const post = await postsRepository.findOne(id)

    await fs.unlink(post.url).catch(() => {})
    await fs.unlink(post.image).catch(() => {})

    await postsRepository.delete(id)
    res.send()
  },
)

const getPosts = R.compose(
  handleGet('/api/v2/posts'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  provide('query', 'user'),
)(
  //
  (
    req,
    res,
    next,
    { limit = 0, offset = 0, search = '', all },
    { username },
  ) => {
    const postsRepository = getRepository('Post')

    const qb1 = postsRepository
      .createQueryBuilder()
      .select([
        'Post.id as id',
        'Post.title as title',
        'Post.url as url',
        'Post.tags as tags',
        'Post.time as time',
        'Post.description as description',
        'Post.image as image',
        'COUNT(Like.id) as likes',
        `SUM(CASE WHEN Like.user = '${username}' THEN 1 ELSE 0 END) as isLiked`,
      ])
      .groupBy('Post.id')
      .orderBy('Post.id', 'DESC')
      .leftJoin('Post.likes', 'Like')
      .limit(limit)
      .offset(offset)

    const qb2 = postsRepository.createQueryBuilder()

    if (all !== 'true') {
      qb1
        .where('Post.time < :time', {
          time: moment().unix(),
        })
        .andWhere('Post.tags like :name', {
          name: '%' + search + '%',
        })

      qb2
        .where('Post.time < :time', {
          time: moment().unix(),
        })
        .andWhere('Post.tags like :name', {
          name: '%' + search + '%',
        })
    }

    Promise.all([qb1.getRawMany(), qb2.getCount()])
      .then(([data, total]) => ({
        data: data.map(x => R.evolve({ tags: R.split(',') }, x)),
        total,
      }))
      .then(obj => res.json(obj))
  },
)

const getPostsV1 = R.compose(
  handleGet('/api/posts'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  provide('query', 'user'),
)(
  //
  (
    req,
    res,
    next,
    { limit = 0, offset = 0, search = '', all },
    { username },
  ) => {
    const postsRepository = getRepository('Post')

    const qb1 = postsRepository
      .createQueryBuilder()
      .select([
        'Post.id as id',
        'Post.title as title',
        'Post.url as url',
        'Post.tags as tags',
        'Post.time as time',
        'Post.description as description',
        'Post.image as image',
        'COUNT(Like.id) as likes',
        `Like.user = '${username}' as isLiked`,
      ])
      .groupBy('Post.id')
      .orderBy('Post.id', 'DESC')
      .leftJoin('Post.likes', 'Like')

    if (all !== 'true') {
      qb1
        .where('Post.time < :time', {
          time: moment().unix(),
        })
        .andWhere('Post.tags like :name', {
          name: '%' + search + '%',
        })
    }

    qb1
      .getRawMany()
      .then(x => res.json(x.map(R.evolve({ tags: R.split(',') }))))
  },
)

const editPost = R.compose(
  handlePut('/api/posts'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  addMiddleware(upload.array('file')),
  provide('body', 'files'),
)(
  //
  async (req, res, next, post, files = []) => {
    const postsRepository = getRepository('Post')
    const editingPost = await postsRepository.findOne(post.id)

    const audio =
      R.find(
        el => el.mimetype === 'audio/mpeg' || el.mimetype === 'audio/mp3',
        files,
      ) || {}
    const image =
      R.find(
        el => el.mimetype === 'image/png' || el.mimetype === 'image/jpg',
        files,
      ) || {}

    let newAudioPath = editingPost.url

    if (audio.path) {
      newAudioPath = `${audio.destination}${audio.filename}.${getFileExtension(
        audio.originalname,
      )}`
      await fs.unlink(editingPost.url)
      await fs.rename(audio.path, newAudioPath)
    }

    let newImagePath = editingPost.image

    if (image.path) {
      newImagePath = `${image.destination}${image.filename}.${getFileExtension(
        image.originalname,
      )}`

      editingPost.image && (await fs.unlink(editingPost.image))
      await fs.rename(image.path, newImagePath)
    }

    await postsRepository.update(post.id, {
      ...R.omit(['file'], post),
      url: newAudioPath,
      image: newImagePath,
    })
    res.status(201).send()
  },
)

const like = R.compose(
  handlePut('/api/posts/:id/like'),
  addMiddleware(passport.authenticate('jwt', { session: false })),
  provideParams,
  provide('user'),
)(
  //
  async (req, res, next, { id: postId }, { username }) => {
    const likeRepository = getRepository('Like')

    const [like] = await likeRepository.find({
      where: { post: postId, user: username },
    })

    if (like) {
      await likeRepository.delete(like.id)
    } else {
      await likeRepository.save({ post: postId, user: username })
    }
    res.status(200).send()
  },
)

module.exports = {
  createPost,
  deletePost,
  getPosts,
  editPost,
  like,
  getPostsV1,
}
