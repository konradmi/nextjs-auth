import { signIn } from 'next-auth/react'

const useLogin = () => {
  const login = async (username: string, password: string) => {
    return signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
      callbackUrl: '/',
    })
  }
  return {
    login
  }
}

export default useLogin
