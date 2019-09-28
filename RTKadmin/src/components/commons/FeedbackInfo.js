import * as React from 'react'
import styled from 'styled-components'
import { Modal, Card, Typography, TextField } from '@material-ui/core'
import Close from './ButtonRemove'

const FormModal = styled(Modal)`
  display: flex;
  overflow: scroll;
`

const FeedbackCard = styled(Card).attrs({ paragraph: true })`
  width: 500px;
  margin: auto;
  padding: 40px;
  padding-bottom: 140px;
  white-space: pre-wrap;
`

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -40px -40px 0 0;
`

const FeedbackInfo = ({ onClose, title, message, user }) => (
  <FormModal open={true}>
    <FeedbackCard>
      <CloseWrapper>
        <Close onClick={onClose} />
      </CloseWrapper>
      <Typography variant="display1"> {title}</Typography>
      <TextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        value={message}
        margin="normal"
        style={{ width: '100%' }}
        onChange={() => {}}
      />
      <Typography variant="headline">
        Пользователь: {user || 'Неизвестно'}
      </Typography>
    </FeedbackCard>
  </FormModal>
)

export default FeedbackInfo
