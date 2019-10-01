import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app'
import 'firebase/auth'

const ProfileMenu = (props) => {

const handleClick = () => {
  firebase.auth().signOut()
  .then((resp) => {
    alert(resp)
    props.handleClose()
    props.isLogged(false)
    props.history.push('/')
  }).catch((error) => {
    alert(error)
  });
}

  return (
    <div>
      <Menu
          id="customized-menu"
          anchorEl={props.anchorEl}
          keepMounted
          open={Boolean(props.anchorEl)}
          onClose={props.handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem
            onClick={handleClick}
          >
            <ListItemIcon>
              <ExitToAppTwoToneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </MenuItem>
        </Menu>
    </div>
  )
}

export default ProfileMenu