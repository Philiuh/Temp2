import { put, all, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { setError, resetError, DELAY_ERROR } from './duck'

const delayError = function*({ payload: { error, time } }) {
  yield put(setError(error))
  yield delay(time)
  yield put(resetError())
}

const errorsSaga = function*() {
  yield all([takeLatest(DELAY_ERROR, delayError)])
}

export default errorsSaga
