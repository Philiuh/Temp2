import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import { REQUEST_FEEDBACK, setFeedback } from './duck'
import * as FeedbackManager from './FeedbackManager'
import { getToken } from '../auth'
import { handleErrors } from '../../aspects'
import { delayError } from '../errors'

const requestFeedback = handleErrors({
  anyErrorActionCreator: () =>
    delayError({ error: 'Ошибка соединения', time: 5000 }),
})(function*() {
  const token = yield select(getToken)
  const feedback = yield call(FeedbackManager.getFeedback, token)
  yield put(setFeedback(feedback))
})

const feedbackSaga = function*() {
  yield all([takeLatest(REQUEST_FEEDBACK, requestFeedback)])
}

export default feedbackSaga
