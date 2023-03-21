import React from 'react'

import styles from './Admin.module.scss'

const Admin = async () => {
  return (
    <div className={styles.Admin}>
      <h1>Only with Admin Privileges</h1>
    </div>
  )
}

export default Admin
