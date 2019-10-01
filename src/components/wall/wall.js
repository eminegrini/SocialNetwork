import React from 'react'
import styles from './wall.module.css'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallDescription: '',
      currentUser: {}
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      wallDescription: e.target.value
    })
  }

  shareState = () => {
    firebase.database().ref('Users/'+this.state.currentUser.uid+'/publications').push({
      picture:'',
      description: this.state.wallDescription,
      date: new Date(),
      iFeel:'',
      iLike:''
    })
  }

  render() {
    return (
      <div className={styles.wallContainer}>
        <Avatar
          alt={this.state.currentUser.displayName} 
          src={this.state.currentUser.photoURL} 
          className={styles.avatar}
        />
        <TextField
          id="filled-multiline-flexible"
          label={"Tell Me About Yourself "+ this.state.currentUser.displayName}
          rows="6"
          fullWidth
          multiline
          rowsMax="10"
          onChange={this.handleChange}
          className={styles.textField}
          margin="normal"
          variant="outlined"
        />
        <div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={this.shareState}
          >
            Share
          </Button>
          <input
            className={styles.input}
            type="file"
          />
        </div>
      </div>
    )
  }
}

export default Wall