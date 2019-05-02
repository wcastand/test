import { ApolloServer, gql } from 'apollo-server-micro'
import { IncomingMessage } from 'http'
import { get, replace } from 'lodash/fp'
import jwt from 'jsonwebtoken'

import typeDefs from '../graphql/schema'
import resolvers from '../graphql/resolvers'
import AuthenticateDirective from '../graphql/directives/authenticate'
import AuthenticateAdminDirective from '../graphql/directives/authenticateAdmin'

export interface MyContext extends IncomingMessage {
  userId?: string
  admin?: boolean
}

const getUserFromRequest = (req: IncomingMessage) => {
  try {
    if (req.headers && req.headers.authorization)
      return get('uid', jwt.decode(replace('Bearer ', '', req.headers.authorization)))
  } catch (e) {
    console.warn(`Failed to get user from request.`, e)
    return null
  }
}
const getAdminFromRequest = (req: IncomingMessage) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = jwt.decode(replace('Bearer ', '', req.headers.authorization))
      return get('type', token) === 'admin'
    }
  } catch (e) {
    console.warn(`Failed to get admin from request.`, e)
    return false
  }
}

const getContext = async ({ req }: { req: IncomingMessage }) => ({
  ...req,
  userId: getUserFromRequest(req),
  admin: getAdminFromRequest(req),
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    authenticate: AuthenticateDirective,
    authenticateAdmin: AuthenticateAdminDirective,
  },
  context: getContext,
  introspection: true,
  playground: true,
})

export default server.createHandler()
