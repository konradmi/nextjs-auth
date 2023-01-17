'use client'

import { SyntheticEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { login } from '../../../utils/auth'

import styles from './LoginPage.module.scss'

const LoginPage = () => {
  const username = useRef('')
  const password = useRef('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const response = await login(username.current, password.current)
    if (response?.error) return setError(response.error || '')
    router.push('/')
  }

  return (
    <form className={styles.LoginPage} onSubmit={handleSubmit}>
      <h1 className={styles.LoginPage__header}>Login</h1>
      <div>
        <label htmlFor='username'>Username</label>
        <input name='username' onChange={(e) => username.current = e.target.value}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input name='password' type='password' onChange={(e) => password.current = e.target.value}/>
      </div>
      {
        error && <h4>{error}</h4>
      }
      <button className={styles.LoginPage__button} type='submit'>Login</button>
    </form>
  )
}

export default LoginPage
