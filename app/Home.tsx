'use client'

import Link from 'next/link'
import { signOut, signIn, useSession } from 'next-auth/react'

import styles from './Home.module.scss'

const Home = () => {
  const { data: session } = useSession()

  return (
    <div className={styles.Home}>
      <div className={styles.Home__navigation}>
        <Link href={'/'}>Home</Link>
        <Link href={'/admin'}>Admin</Link>
      </div>
      {
        session?.user ? (
          <div className={styles.Home__auth}>
            {session.user.username}(id: {session.user.id})
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div className={styles.Home__auth}>
            <Link href={'/auth/register'}>Register</Link>
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        )
      }
    </div>
  )
}

export default Home
