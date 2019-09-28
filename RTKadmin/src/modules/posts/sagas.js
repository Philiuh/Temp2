import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import {
  REQUEST_POSTS,
  setPosts,
  REMOVE_POST,
  CREATE_POST,
  UPDATE_POST,
} from './duck'
import * as PostsManager from './PostsManager'
import { getToken } from '../auth'
import { handleErrors } from '../../aspects'
import * as R from 'ramda'
import { stopSubmit, startSubmit } from 'redux-form'
import { FORMS } from '../../constants'
import { delayError } from '../errors'

const createPostFormData = post => {
  const data = new FormData()

  data.append('title', post.title)
  R.forEach(x => data.append('tags[]', x), post.tags)
  post.file && data.append('file', post.file)
  post.image && data.append('file', post.image)
  data.append('time', post.time)
  post.id && data.append('id', post.id)

  return data
}

const requestPosts = handleErrors({
  anyErrorActionCreator: () =>
    delayError({ error: 'Ошибка соединения', time: 5000 }),
})(function*() {
  const token = yield select(getToken)
  const posts = yield call(PostsManager.getPosts, token)
  yield put(setPosts(posts))
})

const removePost = handleErrors({
  anyErrorActionCreator: () =>
    delayError({ error: 'Ошибка соединения', time: 5000 }),
})(function*({ payload: id }) {
  const token = yield select(getToken)
  yield call(PostsManager.removePost, token, id)
  const posts = yield call(PostsManager.getPosts, token)
  yield put(setPosts(posts))
})

const createPost = handleErrors({
  badRequestActionCreator: R.pipe(
    x => ({ ...x, file: x.mimetype }),
    errors => stopSubmit(FORMS.POST, errors),
  ),
})(function*({ payload: post }) {
  const token = yield select(getToken)

  yield call(PostsManager.savePost, token, createPostFormData(post))
  const posts = yield call(PostsManager.getPosts, token)
  yield put(setPosts(posts))
})

const updatePost = handleErrors({
  badRequestActionCreator: R.pipe(
    x => ({ ...x, file: x.mimetype }),
    errors => stopSubmit(FORMS.POST, errors),
  ),
})(function*({ payload: post }) {
  const token = yield select(getToken)

  yield put(startSubmit(FORMS.POST))
  yield call(PostsManager.updatePost, token, createPostFormData(post))
  const posts = yield call(PostsManager.getPosts, token)
  yield put(setPosts(posts))
  yield put(stopSubmit(FORMS.POST))
})

const posts = function*() {
  yield all([
    takeLatest(REQUEST_POSTS, requestPosts),
    takeLatest(REMOVE_POST, removePost),
    takeLatest(CREATE_POST, createPost),
    takeLatest(UPDATE_POST, updatePost),
  ])
}

export default posts
