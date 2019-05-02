import { SchemaDirectiveVisitor, ForbiddenError } from 'apollo-server-micro'
import { MyContext } from '../../functions/graphql'
export default class AuthenticateAdminDirective extends SchemaDirectiveVisitor {
  public name = 'authenticateAdmin'
  public visitFieldDefinition(field) {
    const { resolve = () => null } = field
    field.resolve = async (root, args, ctx: MyContext) => {
      if (!ctx.admin) {
        throw new ForbiddenError('not admin')
      }
      const result = await resolve(root, args, ctx)
      return result
    }
    return field
  }

  public visitSchemaDirectives() {}
}
