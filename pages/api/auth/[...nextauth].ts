import NextAuth, { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADProvider from 'next-auth/providers/azure-ad'
import bcrypt from 'bcrypt'

import prisma from '../../../lib/prisma'

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
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
        // features can be taken from the db. the user feature is only for demo purposes
        if (isPasswordValid) return { username: user.username, id: user.id.toString(), features: ['user'] }

        return null
      },
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn(payload: any) {
      if (payload.account.provider !== 'azure-ad') return true
      const username = payload.profile.name

      const user = await prisma.users.findFirst({
        where: {
          username
        }
      })

      return user ? true : '/auth/login?error=Azure User Does not Exist';

    },
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }: { session: Session, token: any}) {
      session.user = token.user
      return session
    }
  }
}

export default NextAuth(authOptions)
