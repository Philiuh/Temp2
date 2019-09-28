import { MODULES } from '../../constants'
import { createAction, handleAction } from 'redux-actions'
import { combineReducers } from 'redux'

export const REQUEST_POSTS = `${MODULES.POSTS}/REQUEST_POSTS`
export const SET_POSTS = `${MODULES.POSTS}/SET_POSTS`
export const REMOVE_POST = `${MODULES.POSTS}/REMOVE_POST`
export const CREATE_POST = `${MODULES.POSTS}/CREATE_POST`
export const UPDATE_POST = `${MODULES.POSTS}/UPDATE_POST`
export const SELECT_POST = `${MODULES.POSTS}/SELECT_POST`

const items = handleAction(SET_POSTS, (_, { payload }) => payload, [])
const selectedPost = handleAction(
  SELECT_POST,
  (_, { payload }) => payload,
  null,
)

const posts = combineReducers({ items, selectedPost })

export const requestPosts = createAction(REQUEST_POSTS)
export const setPosts = createAction(SET_POSTS)
export const removePost = createAction(REMOVE_POST)
export const createPost = createAction(CREATE_POST)
export const updatePost = createAction(UPDATE_POST)
export const selectPost = createAction(SELECT_POST)

export default posts
