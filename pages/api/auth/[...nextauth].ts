import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: 'text' },
        password: { type: 'text' }
      },
      async authorize(credentials, _req) {
        if (!credentials) return null
        console.log('authorize')

        const { username, password } = credentials

        if (username === 'konrad' && password === '123') return { username: 'konrad', name: 'Konrad', id: '1' }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  }
}

export default NextAuth(authOptions)
