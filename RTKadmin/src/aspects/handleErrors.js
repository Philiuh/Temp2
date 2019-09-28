import { call, put } from 'redux-saga/effects'
import { BadRequestError, ServerError } from './errors'

const handleErrors = ({
  badRequestActionCreator,
  serverErrorActionCreator,
  anyErrorActionCreator,
  networkErrorActionCreator,
} = {}) => saga =>
  function*(...args) {
    try {
      yield call(saga, ...args)
    } catch (e) {
      if (anyErrorActionCreator) {
        yield call(putActions, anyErrorActionCreator, ...args)
      }

      if (e instanceof BadRequestError && badRequestActionCreator) {
        yield call(putActions, badRequestActionCreator, e.errors, ...args)
        return
      }
      if (e instanceof ServerError && serverErrorActionCreator) {
        yield call(putActions, serverErrorActionCreator, e.errors, ...args)
        return
      }
      if (e.message.indexOf('Network request failed') !== -1) {
        yield call(putActions, networkErrorActionCreator, ...args)
        yield put(networkErrorActionCreator(...args))
        return
      }
      // TODO: Remove in production
      // eslint-disable-next-line
      console.error('Saga error: ', e.message)
    }
  }

const putActions = function*(actionCreators, ...args) {
  if (Array.isArray(actionCreators)) {
    for (const actionCreator of actionCreators) {
      yield put(actionCreator(...args))
    }
  } else {
    yield put(actionCreators(...args))
  }
}

export default handleErrors
