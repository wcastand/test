import { SchemaDirectiveVisitor, defaultMergedResolver, ForbiddenError } from 'apollo-server-micro'
import db from '../../db'
import { MyContext } from '../../functions/graphql'

class AuthenticateDirective extends SchemaDirectiveVisitor {
  public constructor(args) {
    super(args)
    this.name = 'authenticate'
  }
  public visitFieldDefinition(field) {
    const { resolve = defaultMergedResolver } = field
    field.resolve = async (root, args, ctx: MyContext, info) => {
      if (!ctx.userId) throw new ForbiddenError('You are not authorised for this request')
      const [user] = await db('attendee').where('id', ctx.userId)
      if (!user) throw new ForbiddenError('You are not authorised for this request')
      const result = await resolve(root, args, ctx, info)
      return result
    }
    return field
  }
}

export default AuthenticateDirective
