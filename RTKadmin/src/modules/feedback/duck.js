import { MODULES } from '../../constants'
import { createAction, handleAction } from 'redux-actions'
import { combineReducers } from 'redux'

const { FEEDBACK } = MODULES
export const REQUEST_FEEDBACK = `${FEEDBACK}/REQUEST_FEEDBACK`
export const SET_FEEDBACK = `${FEEDBACK}/SET_FEEDBACK`

const items = handleAction(SET_FEEDBACK, (state, { payload }) => payload, [])

const feedback = combineReducers({ items })

export const requestFeedback = createAction(REQUEST_FEEDBACK)
export const setFeedback = createAction(SET_FEEDBACK)

export default feedback
