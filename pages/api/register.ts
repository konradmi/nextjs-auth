import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const { username, password, confirmPassword } = req.body
  console.log(username, password, confirmPassword)
  res.status(404).send()
}
