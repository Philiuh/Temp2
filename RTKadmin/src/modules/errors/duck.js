import { createAction, handleActions } from 'redux-actions'

import { MODULES } from '../../constants'

const { ERRORS } = MODULES
export const SET_ERROR = `${ERRORS}/SET_ERROR`
export const DELAY_ERROR = `${ERRORS}/DELAY_ERROR`
export const RESET_ERROR = `${ERRORS}/RESET_ERROR`

export const setError = createAction(SET_ERROR)
export const resetError = createAction(RESET_ERROR)
export const delayError = createAction(DELAY_ERROR)

const errors = handleActions(
  {
    [SET_ERROR]: (state, { payload }) => payload,
    [RESET_ERROR]: () => '',
  },
  '',
)

export default errors
