import React, { useState } from 'react';
import styles from'./login.module.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'



const Login = (props) => {
  
  const provider = new firebase.auth.GoogleAuthProvider();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginWithGoogle = () => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        props.loginUser(user)
        props.isLogged(true)
        if (result.additionalUserInfo.isNewUser === false) {
          firebase.database().ref('Users/'+ result.user.uid +'/profile').set({
            name: result.additionalUserInfo.profile.given_name, 
            familyName: result.additionalUserInfo.profile.family_name,
            picture: result.additionalUserInfo.profile.picture,
            email: result.additionalUserInfo.profile.email,
            id: result.user.uid
          })
        }
      })
      .catch((error) => {
        props.loginError(error)
    });
  }

  const handleChangeEmail= (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword= (e) => {
    setPassword(e.target.value)
  }

  const loginWithEmail = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(resp => {
      props.isLogged(true)
      props.loginUser(resp.user)
      console.log()
      if(resp.additionalUserInfo.isNewUser === false) {
        firebase.database().ref('Users/'+ resp.user.uid +'/profile').set({
          email: resp.user.email
        })
      }
    })
    .catch((error) => {
      props.loginError(error)
    });
  }

    return (
      <div className={styles.loginContainer}>
        <div className={styles.login}>
          <div className={styles.title}>
            <Typography letiant="h6">
              Login
            </Typography>
          </div>
          <div className={styles.signIn}>
            <TextField
              id="Email"
              label="Email"
              className={styles.textField}
              onChange={handleChangeEmail}
              margin="normal"
            />
            <TextField
              id="Password"
              type="password"
              label="Password"
              className={styles.textField}
              onChange={handleChangePassword}
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={loginWithEmail}
              className={styles.button}
            >
              Log In
            </Button>
            <br/>
            <span>OR</span>
          </div>
          <div className={styles.signInGoogle}>
            <Button
              variant="outlined"
              color="primary" 
              className={styles.button}
              onClick={loginWithGoogle}
            >
              <img width="20px" alt="Google &quot;G&quot; Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
              Login with google
            </Button>
          </div>
        </div>
      </div>
    )
}
export default Login 