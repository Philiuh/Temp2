import { reduxForm } from 'redux-form'
import { FORMS } from '../constants'
import SigninScreen from './SigninScreen'
import { signin } from '../modules/auth'
import * as R from 'ramda'
import { connect } from 'react-redux'

const mapDispatchToProps = {
  signin,
}

const SigninScreenContainer = R.compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  reduxForm({ form: FORMS.SIGNIN }),
)(SigninScreen)

export default SigninScreenContainer
