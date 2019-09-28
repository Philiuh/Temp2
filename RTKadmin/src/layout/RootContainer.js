import { connect } from 'react-redux'
import { checkToken } from '../modules/auth'
import Root from './Root'
import * as R from 'ramda'
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = {
  checkToken,
}

const RootContainer = R.compose(
  withRouter,
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Root)

export default RootContainer
