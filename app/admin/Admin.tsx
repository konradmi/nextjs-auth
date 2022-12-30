import React from 'react'
import prisma from '../../lib/prisma'

import styles from './Admin.module.scss'

const Admin = async () => {
  const users = await prisma.users.findMany()

  return (
    <div className={styles.Admin}>
      <h1>Protected Admin</h1>
      {JSON.stringify(users)}
    </div>
  )
}

export default Admin
