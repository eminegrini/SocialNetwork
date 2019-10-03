import React from 'react'
import ViewCard from '../card'
import styles from './profile.module.css'


const Profile = (props) => {

  return (
    <div className={styles.homeCont}>
      <ViewCard 
        id={props.match.params.profile_id}
      />
    </div>
  )

}

export default Profile