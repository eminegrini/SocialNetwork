import React from 'react'
import Wall from '../wall'
import styles from './home.module.css'


const Home = (props) => {
  return (
    <div className={styles.homeCont}>
      <Wall/>
      {/* <ViewCard
        friends={props.history.push}
      >

      </ViewCard> */}
    </div>
  )

}

export default Home