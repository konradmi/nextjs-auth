'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { signOut, signIn, useSession } from 'next-auth/react'
import { io } from 'socket.io-client'

import styles from './Home.module.scss'

let socket: any = null

const Home = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/websockets')
      socket = io()

      socket.on('connect', () => {
        socket.on('newIncomingMessage', (msg: string) => alert(msg))
        socket.emit('createdMessage')
      })
    }

    socketInitializer()
  }, [])

  return (
    <div className={styles.Home}>
      <div className={styles.Home__navigation}>
        <Link href={'/'}>Home</Link>
        <Link href={'/admin'} prefetch={false}>Admin</Link>
        <Link href={'/user'} prefetch={false}>User</Link>
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
            <button onClick={() => socket.emit('createdMessage')}>Emit Message</button>
          </div>
        )
      }
    </div>
  )
}

export default Home
