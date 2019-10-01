import React from 'react'
import ViewCard from '../card'
import Wall from '../wall'
import styles from './home.module.css'


const Home = () => {

  return (
    <div className={styles.homeCont}>
      <Wall/>
      <ViewCard />
    </div>
  )

}

export default Home