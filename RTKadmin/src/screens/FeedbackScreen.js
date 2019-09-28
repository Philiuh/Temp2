import React from 'react'
import * as R from 'ramda'
import {
  withProps,
  lifecycle,
  withHandlers,
  withStateHandlers,
} from 'recompose'
import styled from 'styled-components'

import { downloadFeedback } from '../utils'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

import { AppBar, BaseTable, FeedbackInfo } from '../components/commons'

const ListGridItem = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  padding-top: 56px;
`

const IdTableCell = styled(TableCell)`
  :hover {
    cursor: pointer;
    color: #3f51b5;
  }
`

const FeedbackRow = ({ id, title, message, user, onPress }) => (
  <TableRow>
    <IdTableCell onClick={onPress} children={id} />
    <TableCell children={user || '  Неизвестно'} />
    <TableCell children={title} />
    <TableCell
      children={
        message && message.length > 100
          ? R.slice(0, 100, message) + '...'
          : message
      }
    />
  </TableRow>
)

const FeedbackScreen = R.compose(
  lifecycle({
    componentDidMount() {
      this.props.requestFeedback()
    },
  }),
  withStateHandlers(
    { isModalOpen: false, selectedFeedback: null },
    {
      selectFeedback: () => feedback => ({
        isModalOpen: true,
        selectedFeedback: feedback,
      }),
      closeModal: () => () => ({ isModalOpen: false }),
    },
  ),
  withHandlers({
    download: () => downloadFeedback,
    onItemPress: ({ selectFeedback }) => feedback => selectFeedback(feedback),
  }),

  withProps(({ feedback, onItemPress }) => ({
    rows: feedback.map(fb => (
      <FeedbackRow onPress={() => onItemPress(fb)} key={fb.id} {...fb} />
    )),
  })),
)(({ rows, download, isModalOpen, selectedFeedback, closeModal }) => (
  <React.Fragment>
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="fixed" />
      </Grid>
      <ListGridItem>
        <BaseTable
          headerNames={[
            { name: 'id', cellStyle: { width: 10, paddingRight: 0 } },
            {
              name: 'Пользователь',
              cellStyle: { width: 100, paddingRight: 24 },
            },
            { name: 'Название', cellStyle: { width: 200, paddingRight: 24 } },
            { name: 'Текст' },
          ]}
          rows={rows}
        />
      </ListGridItem>
      <Button
        onClick={download}
        style={{ backgroundColor: '#3f51b5', color: 'white' }}
      >
        Скачать таблицу
      </Button>
    </Grid>
    {isModalOpen && <FeedbackInfo {...selectedFeedback} onClose={closeModal} />}
  </React.Fragment>
))

export default FeedbackScreen
