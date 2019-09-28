import * as R from 'ramda'

const getStatistics = R.prop('statistics')

export const getUsersItems = R.pipe(
  getStatistics,
  R.prop('usersItems'),
)

export const getTracksItems = R.pipe(
  getStatistics,
  R.prop('tracksItems'),
)
