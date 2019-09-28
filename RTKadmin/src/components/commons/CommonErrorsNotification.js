import React from 'react'
import styled from 'styled-components'

// import red from '@material-ui/core/colors/red'  // 500 color
import Notification from '@material-ui/icons/Error'
import { Typography } from '@material-ui/core'

const IconNotification = styled(Notification)`
  margin-right: 10px;
`

const Error = styled(Typography).attrs({ variant: 'body2' })``

const Wrapper = styled.div`
  position: absolute;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  z-index: 1200;
  bottom: 0;
  width: 100%;
  background-color: rgba(244, 67, 54, 0.6);
`
const CommonErrorsNotification = ({ errors }) => (
  <Wrapper>
    <IconNotification />
    <Error>{errors}</Error>
  </Wrapper>
)
export default CommonErrorsNotification
