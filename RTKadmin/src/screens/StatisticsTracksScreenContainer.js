import * as R from 'ramda'
import { connect } from 'react-redux'
import { requestTracksStatistics, getTracksItems } from '../modules/statistics'

import StatisticsTracksScreen from './StatisticsTracksScreen'

const mapStateToProps = R.applySpec({
  statistics: getTracksItems,
})

const mapDispatchToProps = {
  requestTracksStatistics,
}

const StatisticsTracksScreenContainer = R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(StatisticsTracksScreen)

export default StatisticsTracksScreenContainer
