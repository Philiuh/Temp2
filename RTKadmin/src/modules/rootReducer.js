import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import posts from './posts'
import feedback from './feedback'
import errors from './errors'
import statistics from './statistics'

const rootReducer = combineReducers({
  auth,
  form,
  posts,
  feedback,
  errors,
  statistics,
})

export default rootReducer
