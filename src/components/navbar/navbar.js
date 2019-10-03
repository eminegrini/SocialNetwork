import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './navbar.module.css';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import 'firebase/auth'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ProfileMenu from '../profileMenu'
import map from 'lodash/map';
import { Mentions, Menu, Dropdown } from 'antd';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: null,
      notifications: {},
      searchOption: '',
      filteredUser: {},
      AnchorEl: null,
      openMenu: false
    };
  }

   
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         
          this.props.loginUser(user)
          this.props.history.push('./home')
          this.props.isLogged(true)
          return firebase.database().ref('/').on('value', (snapshot) => {
            map(snapshot.val(), userData => {
          let profiles = map(userData, (profile) => {
            return profile
          })
          map(userData, data =>{
            if(user.uid === data.profile.id && data.notifications) {
              this.setState({
                notifications: data.notifications.friends || 0,
              })
            } 
          })
          this.setState({
            filteredUser: profiles,
          })
        })
      })
      }
    })
  }

  friendSolicitation = (event) => {
    if(event.currentTarget.id !== this.props.user.id){
      firebase.database().ref('Users/'+ event.currentTarget.id +'/notifications').child('friends/'+ this.props.user.id).set({
        id:this.props.user.id,
        type: "friends",
        text: "wants to be your friend",
        from: this.props.user.name,
        picture: this.props.user.photo
      })
    }
    event.preventDefault()
    event.stopPropagation()
  }

  friendSolicitationAcept = (event) => {
      firebase.database().ref('Users/'+ this.props.user.id +'/notifications/friends/'+ event.currentTarget.id).remove()
      console.log(event.currentTarget)
    event.preventDefault()
    event.stopPropagation()
  }
  
  friendSolicitationCancel = (event) => {
    firebase.database().ref('Users/'+ this.props.user.id +'/notifications').child('friends/'+ event.currentTarget.id).set(null)
    this.setState({
      notifications: firebase.database().ref('Users/'+ this.props.user.id +'/notifications').child('friends').on('value', snapshot => snapshot.val())
    })
  event.preventDefault()
  event.stopPropagation()
}
  

  onChange = (value) => {
    this.setState({
      searchOption: value
    })
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

  onSelect = (option) => {
    this.props.history.push('/profile/'+ option.id, { params: option.id })
    this.setState({
      searchOption: ''
    })
  }

  render() {

    const menu = (
      <Menu className={styles.menuNoti}>
        {
          map(this.state.notifications, noti => {
            console.log(noti)
            return(
            <Menu.Item
              key={noti.id}
              className={styles.notificationMenu}
            >
               <Avatar
                  alt="User Profile" 
                  src={noti.picture} 
                />
              <span>
                {noti.from}
                <br/>  
                {noti.text}           
              </span>
              <Button color="primary"  variant="contained" onClick={this.friendSolicitationAcept} id={noti.id}>
                <PersonAddIcon color='inherit' />
              </Button>
              <Button onClick={this.friendSolicitationCancel} color="primary"  variant="contained" id={noti.id}>
                <PersonAddDisabledIcon color='inherit' />
              </Button>
            </Menu.Item>
          )})
        }
       
      </Menu>
    );

    const accountNotification = Object.keys(this.state.notifications).length

    return (
      <div className={styles.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography 
            variant="h6" 
            className={styles.title} 
            onClick={this.props.isLog === true ? () => this.goTo('/home') : () => this.goTo('/login')}
          >
            Social Door
          </Typography>
          {this.props.isLog ?
          <div className={styles.account}>
             <Mentions
                style={{ width: '100%' }}
                onChange={this.onChange}
                onSelect={this.onSelect}
                value={this.state.searchOption}
                placeholder="Search Friends with @ + Name"
                prefix='@'
              >
                { map(this.state.filteredUser, user => (
                    <Mentions.Option 
                      value={user.profile.name + ' ' + user.profile.familyName}
                      key={user.profile.id}
                      className={styles.mentions}
                      id={user.profile.id}
                    >
                    <Avatar
                      alt="User Profile" 
                      src={user.profile.picture} 
                    />
                    <span>
                      {user.profile.name+ ' ' + user.profile.familyName}
                    </span>
                    {this.props.user.id !== user.profile.id &&
                    <Button
                      id={user.profile.id}
                      color="primary" 
                      variant="contained" 
                      style={{width : '30%' }}
                      onClick={this.friendSolicitation}
                    >
                      <GroupAddIcon />
                      Add
                    </Button>
                    }
                    </Mentions.Option>
                  )
                )}
              </Mentions>
              <Dropdown overlay={menu} trigger={['click']}>
                <IconButton 
                  aria-label="show friend notifications"
                  color="inherit"
                  onClick={this.notificationHandleClick}
                >
                  <Badge badgeContent={accountNotification} color="secondary">
                    <PeopleIcon />
                  </Badge>
                </IconButton>
              </Dropdown>
            <span>{this.props.user.name ? this.props.user.name : this.props.user.email}</span>
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
                <AccountCircleIcon 
                  color="primary" 
                />
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