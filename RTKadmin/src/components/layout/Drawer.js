import React from 'react'
import styled from 'styled-components'
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MusicVideo from '@material-ui/icons/MusicVideo'
import Exit from '@material-ui/icons/ExitToApp'
import Feedback from '@material-ui/icons/Feedback'
import Statistics from '@material-ui/icons/Assessment'

const AppDrawer = styled(MuiDrawer).attrs({
  variant: 'permanent',
  anchor: 'left',
})`
  width: 240px;

  & > div {
    width: 240px;
  }
`

const DrawerHeader = styled.div`
  height: 64px;
`

const MenuLink = styled(Link)`
  text-decoration: none;
`

const Drawer = ({ signout }) => (
  <AppDrawer>
    <DrawerHeader />
    <Divider />
    <List>
      <MenuLink to="/posts">
        <ListItem button>
          <ListItemIcon>
            <MusicVideo />
          </ListItemIcon>
          <ListItemText primary="Подкасты" />
        </ListItem>
      </MenuLink>

      <MenuLink to="/feedback">
        <ListItem button>
          <ListItemIcon>
            <Feedback />
          </ListItemIcon>
          <ListItemText primary="Обратная связь" />
        </ListItem>
      </MenuLink>

      <MenuLink to="/statistics/users">
        <ListItem button>
          <ListItemIcon>
            <Statistics />
          </ListItemIcon>
          <ListItemText primary="Статистика" />
        </ListItem>
      </MenuLink>

      <ListItem button onClick={signout}>
        <ListItemIcon>
          <Exit />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </ListItem>
    </List>
  </AppDrawer>
)

export default Drawer
