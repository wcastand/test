import { UserInputError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../../../../db'
import { MutationResolvers } from '../../../../generated/graphql'
const adminLogin: MutationResolvers['adminLogin'] = async (_, { email, password }) => {
  const [user] = await db('admin').where('email', email)
  if (!user) throw new UserInputError('Error in password and/or email')
  if (!bcrypt.compareSync(password, user.encryptedPassword))
    throw new UserInputError('Error in password and/or email')
  return {
    user,
    token: jwt.sign({ uid: user.id, type: 'admin' }, 'jwt-not-secret'),
  }
}

export default adminLogin
