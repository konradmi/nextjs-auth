import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'

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

        const { username, password } = credentials
        const user = await prisma.users.findFirst({
          where: {
            username
          }
        })

        if (!user) throw new Error('User does not exist')

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) throw new Error('Incorrect Password')

        if (isPasswordValid) return { username: user.username, id: user.id.toString() }

        return null
      },
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, token }: { session: any, token: any}) {
      const user = await prisma.users.findFirst({
        where: {
          id: +token.sub
        }
      })
      session.user = {}
      session.user.username = user?.username
      session.user.id = user?.id
      return session
    }
  }
}

export default NextAuth(authOptions)
