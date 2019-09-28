import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styled from 'styled-components'
import { logo } from '../../images'
import LinearGradient from 'react-native-linear-gradient'
import FormInput from './Input'
import { fetchUserToken, getResult } from '../../../modules/authorization'
import { connect } from 'react-redux'

const Wrapper = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  background-color: rgb(28, 18, 46);
`
const Container = styled(View)`
  margin: 15% auto;
  width: 70%;
`
const Title = styled(Text)`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`

const SubTitle = styled(Text)`
  color: #ffffff;
  font-size: 18px;
  font-weight: 100;
  opacity: 0.8;
  margin-bottom: 40px;
`

const Logo = styled(Image)`
  position: absolute;
  bottom: -25%;
  left: -15%;
  width: 130%;
  height: 80%;
  z-index: -1;
`

const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: #ff7400;
  border-radius: 15px;
  padding: 20px 0px;
  margin-top: 20px;
`

const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  font-size: 15px;
`
const ErrorText = styled(Text)`
  color: red;
  text-align: center;
  font-size: 15px;
`

const LoginForm = ({ formData, fetchUserToken }) => {
  const [loginValue, onChangeLogin] = useState('test')
  const [passwordValue, onChangePassword] = useState('test')
  const [error, setError] = useState('')
  // const navigationOptions = {
  //   title: 'Welcome',
  // };


  const onSubmit = () =>
    !loginValue
      ? setError('Введите логин')
      : !passwordValue
      ? setError('Введите пароль')
      : fetchUserToken({ loginValue, passwordValue }) && setError('')

  return (
    <Wrapper colors={['transparent', 'transparent']}>
      <Container>
        <Title>Добро пожаловать</Title>
        <SubTitle>Войдите, чтобы продолжить</SubTitle>
        <FormInput
          label="Имя пользователя"
          value={loginValue}
          onChangeText={onChangeLogin}
          errorUnderline={error}
        />
        <FormInput
          label="Пароль"
          securePassword={true}
          value={passwordValue}
          onChangeText={onChangePassword}
          errorUnderline={error}
        />
        <ErrorText>{error && error}</ErrorText>
        <Button onPress={() => onSubmit()}>
          <ButtonText>Войти</ButtonText>
        </Button>
      </Container>
      <Logo source={logo} />
    </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    formData: getResult(state),
  }
}

export default connect(
  mapStateToProps,
  { fetchUserToken },
)(LoginForm)
