import React, { Fragment } from 'react'
import styled from 'styled-components'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const TableWrapper = styled(Paper)`
  margin: 20px 0;
  overflow-x: auto;
`

const TableHeadCellText = styled(Typography).attrs({
  variant: 'subheading',
})``

const EmptyTableText = styled(Typography).attrs({ variant: 'subheading' })`
  text-align: center;
  padding-top: 50px;
`

const BaseTable = ({ headerNames, rows, ...props }) => (
  <Fragment>
    <TableWrapper {...props}>
      <Table>
        <TableHead>
          <TableRow>
            {headerNames.map(({ name, cellStyle }) => (
              <TableCell style={cellStyle} key={name}>
                <TableHeadCellText children={name} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {!!rows.length && <TableBody children={rows} />}
      </Table>
    </TableWrapper>

    {!rows.length && <EmptyTableText children="Данных в таблице нет" />}
  </Fragment>
)

export default BaseTable
