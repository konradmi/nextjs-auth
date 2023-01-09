import { signIn } from 'next-auth/react'

const useLogin = () => {
  const login = async (username: string, password: string) => {
    await signIn('credentials', {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: '/',
    })
  }
  return {
    login
  }
}

export default useLogin
