import React from 'react'
import RequireFeature from '../../components/RequireFeature'

import styles from './Admin.module.scss'

const Admin = async () => {
  return (
    <RequireFeature features={['admin']}>
      <div className={styles.Admin}>
        <h1>Only with the Admin feature</h1>
      </div>
    </RequireFeature>
  )
}

export default Admin
