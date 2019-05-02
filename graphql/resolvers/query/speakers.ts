import db from '../../../db'
import { QueryResolvers } from '../../../generated/graphql'
const speakers: QueryResolvers['speakers'] = async (
  _,
  { limit, offset }: { limit?: number; offset?: number },
) => {
  const [{ count }] = await db('speaker').count('id')
  const speakers = await db('speaker')
    .limit(limit || 10)
    .offset(offset || 0)
  return {
    items: speakers,
    limit,
    offset,
    totalResult: count,
  }
}
export default speakers
