import { MODULES } from '../../constants'
import { createAction } from 'redux-actions'

export const NAVIGATE = `${MODULES.NAVIGATION}/NAVIGATE`

export const navigate = createAction(NAVIGATE)
