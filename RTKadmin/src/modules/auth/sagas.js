import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as AuthRepository from './AuthRepository'
import * as AuthManager from './AuthManager'
import { setToken, CHECK_TOKEN, SIGNIN, SIGNOUT } from './duck'
import { startSubmit, stopSubmit } from 'redux-form'
import { FORMS } from '../../constants'
import { handleErrors } from '../../aspects'
import { navigate } from '../navigation'

const checkToken = function*() {
  const token = yield call(AuthRepository.getToken)
  if (token) {
    yield put(setToken(token))
  } else {
    yield put(setToken(''))
  }
}

const signin = handleErrors({
  badRequestActionCreator: errors =>
    errors
      ? stopSubmit(FORMS.SIGNIN, errors)
      : stopSubmit(FORMS.SIGNIN, {
          username: 'Неверное имя пользователя или пароль',
        }),
})(function*({ payload: user }) {
  yield put(startSubmit(FORMS.SIGNIN))
  const token = yield call(AuthManager.signin, user)
  yield put(setToken(token))
  yield call(AuthRepository.setToken, token)
  yield put(stopSubmit(FORMS.SIGNIN))
  yield put(navigate('/posts'))
})

const signout = function*() {
  yield call(AuthRepository.removeToken)
  yield put(setToken(''))
  yield put(navigate('/signin'))
}

const authSaga = function*() {
  yield all([
    takeLatest(CHECK_TOKEN, checkToken),
    takeLatest(SIGNIN, signin),
    takeLatest(SIGNOUT, signout),
  ])
}

export default authSaga
