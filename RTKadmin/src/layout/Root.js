import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SigninScreenContainer } from '../screens'
import MainContainer from './MainContainer'
import { lifecycle } from 'recompose'
import { setHistory } from '../modules/navigation'

const Root = lifecycle({
  componentDidMount() {
    this.props.checkToken()
    setHistory(this.props.history)
  },
})(() => (
  <Switch>
    <Route path="/signin" component={SigninScreenContainer} />
    <Route path="/" component={MainContainer} />
  </Switch>
))

export default Root
