import React from 'react'
import RequireFeature from '../../components/RequireFeature'

import styles from './User.module.scss'

const User = async () => {
  return (
    <RequireFeature features={['user']}>
      <div className={styles.User}>
        <h1>Only with the User or Admin features</h1>
      </div>
    </RequireFeature>
  )
}

export default User
