import React from 'react'

import styles from './User.module.scss'

const User = async () => {
  return (
    <div className={styles.User}>
      <h1>Only with User or Admin privileges</h1>
    </div>
  )
}

export default User
