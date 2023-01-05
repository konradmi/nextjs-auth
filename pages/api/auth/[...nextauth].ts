import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials

        if (username === 'konrad' && password === '123') return { username: 'konrad', name: 'Konrad' }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  }
}

export default NextAuth(authOptions)
