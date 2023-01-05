'use client'

import { SyntheticEvent, useRef, useState } from 'react'

import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
  const [error, setError] = useState('')
  const username = useRef<string>('')
  const password = useRef<string>('')
  const confirmPassword = useRef<string>('')


  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) setError('Password mismatch')

    const body = {
      username: username.current,
      password: password.current,
      confirmPassword: password.current,
    }

    await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  return (
    <form className={styles.RegisterPage} onSubmit={handleSubmit}>
      <h1 className={styles.Register__header}>Login</h1>
      <div>
        <label htmlFor='username'>Username</label>
        <input name='username' onChange={(e) => username.current = e.target.value}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input name='password' type='password' onChange={(e) => password.current = e.target.value}/>
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input name='confirmPassword' type='password' onChange={(e) => confirmPassword.current = e.target.value}/>
      </div>
      {
        error && <h4>{error}</h4>
      }
      <button className={styles.RegisterPage__button} type='submit'>Register</button>
    </form>
  )
}

export default RegisterPage
