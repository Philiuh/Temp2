import * as R from 'ramda'
import ENDPOINTS from '../../api'
import { handleStatuses } from '../../aspects'

export const getStatisticsUsers = R.pipeP(
  token =>
    fetch(`${ENDPOINTS.STATISTICS}/users`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    }),
  handleStatuses(),
  x => x.json(),
)

export const getStatisticsTracks = R.pipeP(
  token =>
    fetch(`${ENDPOINTS.STATISTICS}/posts`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    }),
  handleStatuses(),
  x => x.json(),
)
