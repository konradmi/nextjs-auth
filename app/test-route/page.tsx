import React from 'react'
import prisma from '../../lib/prisma'

import styles from './page.module.scss'

const TestRoute = async () => {
  const users = await prisma.users.findMany()
  return (
    <div className={styles.page}>
      {JSON.stringify(users)}
    </div>
  )
}

export default TestRoute
