import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
  PostsScreenContainer,
  FeedbackScreenContainer,
  StatisticsUsersScreenContainer,
  StatisticsTracksScreenContainer,
} from '../screens'
import { DrawerContainer } from '../components/layout'
import { CommonErrorsNotification } from '../components/commons'

const Indicator = styled(CircularProgress)`
  margin: auto;
`

const ScreenWrapper = styled.div`
  display: flex;
`

const Main = ({ isSignedin, errors }) =>
  isSignedin === undefined ? (
    <Indicator size={20} />
  ) : !isSignedin ? (
    <Redirect to="/signin" />
  ) : (
    <ScreenWrapper>
      <DrawerContainer />

      <Switch>
        <Route path="/posts" component={PostsScreenContainer} />
        <Route path="/feedback" component={FeedbackScreenContainer} />
        <Route
          path="/statistics/users"
          component={StatisticsUsersScreenContainer}
        />
        <Route
          path="/statistics/tracks"
          component={StatisticsTracksScreenContainer}
        />
        <Redirect from="/statistics" to="/statistics/users" />
        <Redirect from="/" to="/posts" />
      </Switch>
      {!!errors && <CommonErrorsNotification errors={errors} />}
    </ScreenWrapper>
  )

export default Main
