import React from 'react'
import AppBarMaterial from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const ToolBatTitle = styled(Typography).attrs({
  variant: 'title',
  color: 'inherit',
})`
  flex: 1;
`

const HeaderButton = styled(Button).attrs({ variant: 'outlined' })`
  color: #fff;
  border-color: #fff;
`

const AppBar = ({ buttons = [], ...props }) => (
  <AppBarMaterial
    position="static"
    color="primary"
    {...props}
    style={{ zIndex: 1200 }}
  >
    <Toolbar>
      <ToolBatTitle>Подкасты</ToolBatTitle>
      {buttons.map(({ name, handler }) => (
        <HeaderButton key={name} onClick={handler}>
          {name}
        </HeaderButton>
      ))}
    </Toolbar>
  </AppBarMaterial>
)

export default AppBar
