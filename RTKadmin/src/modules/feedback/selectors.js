import * as R from 'ramda'

const getFeedback = R.prop('feedback')

export const getItems = R.pipe(
  getFeedback,
  R.prop('items'),
)
