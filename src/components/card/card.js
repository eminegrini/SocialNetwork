import React, { useEffect, useState } from 'react';
import styles from './card.module.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import firebase from 'firebase/app'
import map from 'lodash/map'
import 'firebase/firestore'
import 'firebase/auth'


const ViewCard = (props)  => {

  const [posts, setPost] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return firebase.database().ref('/Users/' + user.uid + '/publications').on('value', (snapshot) => {
          setPost(snapshot.val())
        });
      }
    });
  },[])

  return (
    <div className={styles.cardContainer}> 
    {
      posts && map(posts, post => (
        <Card className={styles.card} key={post.picture} >
        <CardHeader
          avatar={
            <Avatar 
              aria-label="recipe" 
              className={styles.avatar}
              alt="User Profile" 
              src={props.user.photo} 
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.user.name}
          subheader={post.date}
        />
        <CardMedia
          className={styles.media}
          image={post.picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_UE5gown5KNIg10tZWIX0Y_Y1gsWtvu95mxFWpOwLigekC5j8'}
          title="Fruit"
        />
        <CardContent className={styles.desc}>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      )
      ).reverse()
    }
    </div>
  );
}

export default ViewCard