import * as R from 'ramda'
import { connect } from 'react-redux'
import { getItems, requestFeedback } from '../modules/feedback'

import FeedbackScreen from './FeedbackScreen'

const mapStateToProps = R.applySpec({
  feedback: getItems,
})

const mapDispatchToProps = {
  requestFeedback,
}

const FeedbackScreenContainer = R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FeedbackScreen)

export default FeedbackScreenContainer
