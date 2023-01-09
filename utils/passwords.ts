import bcrypt from 'bcrypt'

export const hash = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10)
}
