import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './modules'
import RootContainer from './layout'
import { injectGlobal } from 'styled-components'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import 'normalize.css'
import 'moment/locale/ru'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

injectGlobal`
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #eeeeee;
  }
`

const App = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={store}>
      <Router>
        <RootContainer />
      </Router>
    </Provider>
  </JssProvider>
)

export default App
