import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import {
  REQUEST_USERS_STATISTICS,
  setUsersStatistics,
  setTracksStatistics,
  REQUEST_TRACKS_STATISTICS,
} from './duck'
import * as StatisticsManager from './StatisticsManager'
import { getToken } from '../auth'
import { handleErrors } from '../../aspects'
import { delayError } from '../errors'

const requestUsersStatistics = handleErrors({
  anyErrorActionCreator: () =>
    delayError({ error: 'Ошибка соединения', time: 5000 }),
})(function*() {
  const token = yield select(getToken)
  const statistics = yield call(StatisticsManager.getStatisticsUsers, token)

  yield put(setUsersStatistics(statistics))
})

const requestTracksStatistics = handleErrors({
  anyErrorActionCreator: () =>
    delayError({ error: 'Ошибка соединения', time: 5000 }),
})(function*() {
  const token = yield select(getToken)
  const statistics = yield call(StatisticsManager.getStatisticsTracks, token)

  yield put(setTracksStatistics(statistics))
})

const statisticsSaga = function*() {
  yield all([
    takeLatest(REQUEST_USERS_STATISTICS, requestUsersStatistics),
    takeLatest(REQUEST_TRACKS_STATISTICS, requestTracksStatistics),
  ])
}

export default statisticsSaga
