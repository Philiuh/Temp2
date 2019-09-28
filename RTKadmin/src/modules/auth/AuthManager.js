import * as R from 'ramda'
import ENDPOINTS from '../../api'
import { handleStatuses } from '../../aspects'

export const signin = R.pipeP(
  user =>
    fetch(ENDPOINTS.SIGNIN, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }),
  handleStatuses({ shouldParse400: true }),
  x => x.json(),
  R.prop('accessToken'),
)
