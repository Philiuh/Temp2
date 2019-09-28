import * as R from 'ramda'
import ENDPOINTS from '../../api'
import { handleStatuses } from '../../aspects'

export const getFeedback = R.pipeP(
  token =>
    fetch(ENDPOINTS.FEEDBACK, {
      headers: { authorization: `Bearer ${token}` },
    }),
  handleStatuses(),
  x => x.json(),
)
