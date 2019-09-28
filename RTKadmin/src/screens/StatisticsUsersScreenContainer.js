import * as R from 'ramda'
import { connect } from 'react-redux'
import { requestUsersStatistics, getUsersItems } from '../modules/statistics'

import StatisticsUsersScreen from './StatisticsUsersScreen'

const mapStateToProps = R.applySpec({
  statistics: getUsersItems,
})

const mapDispatchToProps = {
  requestUsersStatistics,
}

const StatisticsUserScreenContainer = R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(StatisticsUsersScreen)

export default StatisticsUserScreenContainer
