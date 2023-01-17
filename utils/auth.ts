import { signIn } from 'next-auth/react'

export const login = async (username: string, password: string) => {
  return signIn('credentials', {
    username: username,
    password: password,
    redirect: false,
  })
}

export const register = async (username: string, password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return { error: 'Password mismatch', success: false }

  const body = {
    username: username,
    password: password,
    confirmPassword: password,
  }

  try {
    const responseRegister = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!responseRegister.ok) {
      const body = await responseRegister.json()

      throw Error(body.error)
    }
    await login(username, password)

    return { error: null, success: true }
  } catch (e: any) {
    return {
      error: e?.message,
      success: false
    }
  }
}
