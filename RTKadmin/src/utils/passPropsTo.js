import { withHandlers } from 'recompose'
import * as R from 'ramda'
import React from 'react'

const passPropsTo = (to, ...includeProps) => Component =>
  withHandlers({
    onAction: props => () =>
      props[to] && props[to](R.pick(includeProps, props)),
  })(({ onAction, ...props }) => (
    <Component {...props} {...{ [to]: onAction }} />
  ))

export default passPropsTo
