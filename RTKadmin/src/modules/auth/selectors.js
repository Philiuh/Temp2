import * as R from 'ramda'

const getAuth = R.prop('auth')

export const getToken = R.pipe(
  getAuth,
  R.prop('token'),
)

export const getIsSignedin = R.pipe(
  getToken,
  R.cond([
    [R.equals(null), R.always(undefined)],
    [R.equals(''), R.always(false)],
    [R.T, R.always(true)],
  ]),
)
