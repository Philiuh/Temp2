import { NAVIGATE } from './duck'
import { all, takeLatest, call } from 'redux-saga/effects'

let history

export const setHistory = x => (history = x)

const navigate = function*({ payload: path }) {
  yield call(history.push, path)
}

const navigation = function*() {
  yield all([takeLatest(NAVIGATE, navigate)])
}

export default navigation
