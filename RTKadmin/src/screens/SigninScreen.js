import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core'
import styled from 'styled-components'
import { Field } from 'redux-form'
import { TextInputField } from '../components/commons'

const Container = styled(Grid).attrs({ container: true })`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Item = styled(Grid).attrs({ item: true, xs: 4 })``

const SigninPaper = styled(Paper).attrs({ elevation: 1 })`
  padding: 40px;
`

const ContinueButton = styled(Button)`
  margin-top: 20px;
`

const Indicator = styled(CircularProgress)``

const SigninScreen = ({ handleSubmit, signin, submitting }) => (
  <Container>
    <Item>
      <SigninPaper>
        <Typography variant="headline" gutterBottom align="center">
          Авторизация
        </Typography>

        <Field
          name="username"
          component={TextInputField}
          label="Логин"
          margin="dense"
          fullWidth
        />
        <Field
          name="password"
          type="password"
          component={TextInputField}
          label="Пароль"
          margin="dense"
          fullWidth
        />

        <ContinueButton
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
          onClick={handleSubmit(signin)}
          disabled={submitting}
        >
          {submitting ? <Indicator size={20} /> : 'Войти'}
        </ContinueButton>
      </SigninPaper>
    </Item>
  </Container>
)

export default SigninScreen
