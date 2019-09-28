import { MODULES } from '../../constants'
import { handleAction, createAction } from 'redux-actions'
import { combineReducers } from 'redux'

export const CHECK_TOKEN = `${MODULES.AUTH}/CHECK_TOKEN`
export const SET_TOKEN = `${MODULES.AUTH}/SET_TOKEN`
export const SIGNIN = `${MODULES.AUTH}/SIGNIN`
export const SIGNOUT = `${MODULES.AUTH}/SIGNOUT`

const token = handleAction(SET_TOKEN, (state, { payload }) => payload, null)

const auth = combineReducers({ token })

export const checkToken = createAction(CHECK_TOKEN)
export const setToken = createAction(SET_TOKEN)
export const signin = createAction(SIGNIN)
export const signout = createAction(SIGNOUT)

export default auth
