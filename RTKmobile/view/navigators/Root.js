import React from 'react'
import LoginForm from '../screens/LoginForm/LoginForm'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

const MainNavigator = createStackNavigator({
  LoginForm: { screen: LoginForm },
})
const Root = createAppContainer(MainNavigator)

export default Root
