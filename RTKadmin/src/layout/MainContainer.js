import { connect } from 'react-redux'
import * as R from 'ramda'
import { withRouter } from 'react-router-dom'

import { getIsSignedin } from '../modules/auth'
import { getErrors } from '../modules/errors'
import Main from './Main'

const mapStateToProps = R.applySpec({
  isSignedin: getIsSignedin,
  errors: getErrors,
})

const MainContainer = R.compose(
  withRouter,
  connect(mapStateToProps),
)(Main)

export default MainContainer
