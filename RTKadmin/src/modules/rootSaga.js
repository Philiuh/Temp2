import { all, call } from 'redux-saga/effects'
import { authSaga } from './auth'
import { navigationSaga } from './navigation'
import { postsSaga } from './posts'
import { feedbackSaga } from './feedback'
import { errorsSaga } from './errors'
import { statisticsSaga } from './statistics'

const rootSaga = function*() {
  yield all([
    call(authSaga),
    call(navigationSaga),
    call(postsSaga),
    call(feedbackSaga),
    call(errorsSaga),
    call(statisticsSaga),
  ])
}

export default rootSaga
