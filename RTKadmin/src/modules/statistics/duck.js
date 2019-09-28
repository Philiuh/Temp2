import { MODULES } from '../../constants'
import { createAction, handleAction } from 'redux-actions'
import { combineReducers } from 'redux'

export const REQUEST_USERS_STATISTICS = `${
  MODULES.STATISTICS
}/REQUEST_USERS_STATISTICS`
export const REQUEST_TRACKS_STATISTICS = `${
  MODULES.STATISTICS
}/REQUEST_TRACKS_STATISTICS`
export const SET_USERS_STATISTICS = `${MODULES.STATISTICS}/SET_USERS_STATISTICS`
export const SET_TRACKS_STATISTICS = `${
  MODULES.STATISTICS
}/SET_TRACKS_STATISTICS`

const usersItems = handleAction(
  SET_USERS_STATISTICS,
  (_, { payload }) => payload,
  [],
)
const tracksItems = handleAction(
  SET_TRACKS_STATISTICS,
  (_, { payload }) => payload,
  [],
)

const statistics = combineReducers({ usersItems, tracksItems })

export const requestUsersStatistics = createAction(REQUEST_USERS_STATISTICS)
export const requestTracksStatistics = createAction(REQUEST_TRACKS_STATISTICS)
export const setUsersStatistics = createAction(SET_USERS_STATISTICS)
export const setTracksStatistics = createAction(SET_TRACKS_STATISTICS)

export default statistics
