import db from '../../../db'
import { QueryResolvers } from '../../../generated/graphql'
const attendees: QueryResolvers['attendees'] = async (
  _,
  { limit, offset }: { limit?: number; offset?: number },
) => {
  const [{ count }] = await db('attendee').count('id')
  const attendees = await db('attendee')
    .limit(limit || 10)
    .offset(offset || 0)
  return {
    items: attendees,
    limit,
    offset,
    totalResult: count,
  }
}
export default attendees
