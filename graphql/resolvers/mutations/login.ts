import { UserInputError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../../../db'
import { MutationResolvers } from '../../../generated/graphql'
const login: MutationResolvers['login'] = async (_, { email, password }, ctx) => {
  const [user] = await db('attendee').where('email', email)
  if (!user) throw new UserInputError('Error in password and/or email')
  if (!bcrypt.compareSync(password, user.encryptedPassword))
    throw new UserInputError('Error in password and/or email')
  ctx.userId = user.id
  return {
    user,
    token: jwt.sign({ uid: user.id }, 'jwt-not-secret'),
  }
}

export default login
