import React from 'react'
import * as R from 'ramda'
import { withProps, lifecycle } from 'recompose'
import styled from 'styled-components'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Grid } from '@material-ui/core'

import { AppBar, BaseTable } from '../components/commons'
import { Navbar } from '../components/statistics'

const ListGridItem = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  padding-top: 56px;
`

const StatisticsRow = ({ postId, title, username }) => (
  <TableRow>
    <TableCell children={username} />
    <TableCell children={title} />
    <TableCell children={postId} />
  </TableRow>
)

const StatisticsUsersScreen = R.compose(
  lifecycle({
    componentDidMount() {
      this.props.requestUsersStatistics()
    },
  }),
  withProps(({ statistics }) => ({
    rows: statistics.map(x => <StatisticsRow key={x.id} {...x} />),
  })),
)(({ rows }) => (
  <React.Fragment>
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="fixed" />
      </Grid>
      <ListGridItem>
        <Navbar />
        <BaseTable
          headerNames={[
            {
              name: 'E-mail',
              cellStyle: { width: 100, paddingRight: 24 },
            },
            {
              name: 'Название подкаста',
              cellStyle: { width: 200, paddingRight: 24 },
            },
            { name: 'Номер подкаста' },
          ]}
          rows={rows}
        />
      </ListGridItem>
    </Grid>
  </React.Fragment>
))

export default StatisticsUsersScreen
