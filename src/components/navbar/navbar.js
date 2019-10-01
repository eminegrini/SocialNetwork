import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './navbar.module.css';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app'
import 'firebase/auth'
import ProfileMenu from '../profileMenu'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: null
    };
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
       this.props.loginUser(user)
       this.props.history.push('./home')
       this.props.isLogged(true)
      }
    });
  }
  
  handleClose = () => {
    this.setState({
      isOpen: null
    });
  };

  handleClick = (event) => {
    this.setState({
      isOpen: event.currentTarget
    })
  };

  goTo = (rute) => {
    this.props.history.push(rute)
  }  
  render() {
    return (
      <div className={styles.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography 
            variant="h6" 
            className={styles.title} 
            onClick={() => this.goTo('/home')}
          >
            Social Door
          </Typography>
          {this.props.isLog ?
          <div className={styles.account}>
            <span>Hello, {this.props.user.name ? this.props.user.name : this.props.user.email}</span>
            {
              this.props.user.photo ?
              <Avatar
                alt="User Profile" 
                src={this.props.user.photo} 
                className={styles.avatar} 
                onClick={this.handleClick}
              />
              :
              <Avatar
                alt="User Profile" 
                className={styles.avatar} 
                onClick={this.handleClick}
              >
                <AccountCircleIcon color="primary" />
              </Avatar>
            }
          </div>
          :
          <div>
            <Button 
              color="inherit"
              onClick={() => this.goTo('/register')}
            >
            Register
            </Button>
            <Button 
              color="inherit"
              onClick={() => this.goTo('/login')}
            >
              Login
            </Button>
          </div>
          }
        
        </Toolbar>
      </AppBar>
      <ProfileMenu 
        anchorEl = {this.state.isOpen}
        handleClose= {this.handleClose}
      />
    </div>
    )
  }
}
export default NavBar 