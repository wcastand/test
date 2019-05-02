import { UserInputError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../../../db'
import { MutationResolvers, Attendee } from '../../../generated/graphql'
const register: MutationResolvers['register'] = async (_, { email, password }, ctx) => {
  const [existingUser] = await db('attendee').where('email', email)
  if (existingUser) throw new UserInputError('This attendee already exist')
  const [user]: [Attendee] = await db('attendee')
    .returning('*')
    .insert({
      email,
      encryptedPassword: bcrypt.hashSync(password),
    })
  ctx.userId = user.id
  return {
    user,
    token: jwt.sign({ uid: user.id }, 'jwt-not-secret'),
  }
}

export default register
