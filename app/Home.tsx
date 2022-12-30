'use client'

import Link from 'next/link'
import { signOut, signIn, useSession } from 'next-auth/react'

import styles from './Home.module.scss'

const Home = () => {
  const { data: session } = useSession()
  console.log('session', session)
  return (
    <div className={styles.Home}>
      <Link href={'/'}>Home</Link>
      <Link href={'/admin'}>Admin</Link>
      {
        session?.user ? (
          <div>
            {session.user.name}
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )
      }
    </div>
  )
}

export default Home
