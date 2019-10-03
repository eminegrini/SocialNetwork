import React from 'react';
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


class ViewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      friend:{},
      user: {},
      friendsPosts: {}
    };
  }

  componentDidMount() {
    return (
      firebase.database().ref('/Users/' + this.props.id + '/profile/').on('value', (snapshot) => {
        this.setState({
          user: snapshot.val()
        })
      }),
      firebase.database().ref('/Users/' + this.props.id + '/publications').on('value', (snapshot) => {
        this.setState({
          posts: snapshot.val()
        })
      }),
      firebase.database().ref('/Users/' + this.props.id + '/friends').on('value', (snapshot) => {
        this.setState({
          friendsPosts: snapshot.val()
        })
      })
    )
  }
 //refactor yo useefect and usestate :D
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.location.state.params !== nextProps.location.state.params) {
      firebase.database().ref('/Users/' + nextProps.location.state.params + '/publications').on('value', (snapshot) => {
        this.setState({
          posts: snapshot.val()
        })
      })
      firebase.database().ref('/Users/' + nextProps.location.state.params + '/profile/').on('value', (snapshot) => {
        this.setState({
          user: snapshot.val()
        })
      })
    }
  }

  render() {
    return (
      <div className={styles.cardContainer}> 
      {
        this.state.posts && map(this.state.posts, post => (
          <Card className={styles.card} key={post.date} >
          <CardHeader
            avatar={
              <Avatar 
                aria-label="recipe" 
                className={styles.avatar}
                alt="User Profile" 
                src={this.state.user.picture} 
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={this.props.user.name}
            subheader={post.date}
          />
          <CardMedia
            className={styles.media}
            image={post.picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_UE5gown5KNIg10tZWIX0Y_Y1gsWtvu95mxFWpOwLigekC5j8'}
            title={post.picture}
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
  
}

export default ViewCard