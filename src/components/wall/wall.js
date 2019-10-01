import React from 'react'
import styles from './wall.module.css'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import * as firebase from 'firebase/app'
import { Progress } from 'antd'
import 'antd/dist/antd.css'
import Card from '@material-ui/core/Card';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { Modal } from 'antd';

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadValue: 0,
      wall: {
        description: '',
        picture: ''
      },
      currentUser: {},
      picture:'',
      visibleModal: false,
      errorModal: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user
        })
        this.props.isLogged(true)
      }
    });
  }

  handleOk = e => {
    this.setState({
      visibleModal: false,
    });
  };

  uploadImage = (e) => {
    const file = e.target.files[0]
    const storageRef= firebase.storage().ref('/publications/' + this.state.currentUser.uid + '/images')
    const task = storageRef.put(file)
    
    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      this.error()
    }, () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        this.setState({
          uploadValue: 100,
          picture: downloadURL,
        })
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      wall: {
        description: e.target.value,
      }
    })
  }

  showModal = (message) => {
    this.setState({
      visibleModal: true,
      errorModal: message,
    });
  };

  shareState = () => {
    const day = new Date().toLocaleDateString()
    const hs = new Date().toLocaleTimeString()
    if(this.state.wall.description !== '' || this.state.picture !== ''){
      firebase.database().ref('Users/'+this.state.currentUser.uid+'/publications').push({
        picture: this.state.picture || '',
        description: this.state.wall.description || '',
        date: day+ ' ' + hs,
        iFeel:'',
        iLike:''
      })
      this.showModal('Publication Shared')
    }
    else {
      this.showModal('Error NOT Publication Shared')
    }
    if(this.state.uploadValue === 100 || this.state.wall.description !== ''){
      this.setState({
        wall: {
          description: '',
        },
        uploadValue: 0,
        picture:''
      })
    } else {
      this.showModal('Error NOT Publication Shared')
    }
  }

  render() {
    return (
      <div className={styles.wallContainer}>
        <Avatar
          alt={this.state.currentUser.displayName} 
          src={this.state.currentUser.photoURL} 
          className={styles.avatar}
        />
        {
          this.state.uploadValue < 1 ?
        <TextField
          variant="outlined"
          type="file"
          rows="4"
          fullWidth
          onChange={this.uploadImage}
          helperText="Upload Image"
        >
        </TextField>
        :
        this.state.uploadValue === 100 ?
          <Card
            className={styles.card}
          >
            <img
              src={this.state.picture}
              alt="upload"
            />
          </Card>
          :
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={this.state.uploadValue}
            status="active"
            successPercent={100}
            showInfo={ false }
          />

        }
        
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
          value={this.state.wall.description}
        />

          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={this.shareState}
          >
            Share
          </Button>
          <Modal
            title={this.state.errorModal}
            visible={this.state.visibleModal}
            onOk={this.handleOk}
            onCancel={this.handleOk}
          />
      </div>
    )
  }
}

export default Wall