import * as R from 'ramda'
import { BadRequestError, ServerError } from './errors'

const handleStatuses = ({
  shouldParse400,
  shouldParse401,
  shouldParse500,
} = {}) =>
  R.cond([
    [
      R.propEq('status', 400),
      R.pipeP(
        x => (shouldParse400 ? x.json() : Promise.resolve()),
        x => Promise.reject(new BadRequestError('', x)),
      ),
    ],
    [
      R.propEq('status', 401),
      R.pipeP(
        x => (shouldParse401 ? x.json() : Promise.resolve()),
        x => Promise.reject(new BadRequestError('', x)),
      ),
    ],
    [
      R.propEq('status', 500),
      R.pipeP(
        x => (shouldParse500 ? x.json() : Promise.resolve()),
        x => Promise.reject(new ServerError('', x)),
      ),
    ],
    [R.T, R.identity],
  ])

export default handleStatuses
