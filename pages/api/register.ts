import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'
import { hash } from '../../utils/passwords'

type User = {
  username: string
}

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Error>
) {
  const { username, password, confirmPassword } = req.body

  if (password !== confirmPassword) return res.status(400).json({ error: 'Password mismatch'})

  const existingUser = await prisma.users.findFirst({
    where: { username }
  })

  if (existingUser) return res.status(409).json({ error: 'The user already exists' })

  const user = await prisma.users.create({
    data: {
      username,
      password: await hash(password)
    }
  })

  res.json({
    username: user.username!,
  })
}
