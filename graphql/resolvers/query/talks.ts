import db from '../../../db'
import { QueryResolvers } from '../../../generated/graphql'
const talks: QueryResolvers['talks'] = async (
  _,
  { limit, offset }: { limit?: number; offset?: number },
) => {
  const [{ count }] = await db('talk').count('id')
  const talks = await db('talk')
    .limit(limit || 10)
    .offset(offset || 0)
  return {
    items: talks,
    limit,
    offset,
    totalResult: count,
  }
}
export default talks
