import { connect } from 'react-redux'

import Drawer from './Drawer'
import { signout } from '../../modules/auth'

const mapDispatchToProps = {
  signout,
}

const DrawerContainer = connect(
  undefined,
  mapDispatchToProps,
)(Drawer)

export default DrawerContainer
