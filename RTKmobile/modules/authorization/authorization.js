import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { takeEvery, put, call, select } from 'redux-saga/effects'
import * as AuthorizationManager from './AuthorizationManager'
export const fetchUserToken = createAction('FETCHED_USER_TOKEN')
const requestLoginResponse = createAction('REQUEST_USER_TOKEN_SUCCEED')

const formValues = handleActions(
  {
    [fetchUserToken]: (_, { payload }) => ({
      payload,
    }),
  },
  { username: undefined, password: undefined },
)

const token = handleActions(
  {
    [requestLoginResponse]: (_, { payload }) => ({ payload }),
  },
  {},
)

// const error = handleActions(
//   {
//     [requestLoginResponse]: (_, { payload }) => ({ payload }),
//   },
//   {},
// )

export const authorization = combineReducers({ formValues, token })

export function* watchFetchUserToken() {
  yield takeEvery(fetchUserToken, fetchUserTokenAsync)
}

function* fetchUserTokenAsync() {
  const formValues = yield select(getFormValue)
  const userToken = yield call(AuthorizationManager.loginRequest, formValues)
  console.log(userToken)
  yield put(requestLoginResponse(userToken))
}

const getFormValue = state => {
  return state.authorization.formValues.payload
}

export const getResult = state => {
  return state.authorization.token.payload
}
