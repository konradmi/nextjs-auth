'use client'

import { SyntheticEvent, useRef } from 'react'

import useLogin from './hooks/useLogin'

import styles from './LoginPage.module.scss'

const LoginPage = () => {
  const username = useRef('')
  const password = useRef('')
  const { login } = useLogin()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await login(username.current, password.current)
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
      <button className={styles.LoginPage__button} type='submit'>Login</button>
    </form>
  )
}

export default LoginPage
