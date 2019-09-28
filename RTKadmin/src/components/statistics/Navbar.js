import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

const NavigationContainer = styled(Grid)`
  padding: 25px 20px 0 20px;
`

const Navbar = () => (
  <NavigationContainer>
    <Link to="/statistics/users">
      <Button
        style={{
          backgroundColor: '#3f51b5',
          color: 'white',
          marginRight: 20,
        }}
      >
        Пользователи
      </Button>
    </Link>
    <Link to="/statistics/tracks">
      <Button style={{ backgroundColor: '#3f51b5', color: 'white' }}>
        Подкасты
      </Button>
    </Link>
  </NavigationContainer>
)

export default Navbar
