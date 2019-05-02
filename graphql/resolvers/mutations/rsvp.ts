import { ApolloError } from 'apollo-server-core'

import db from '../../../db'
import { MutationResolvers } from '../../../generated/graphql'
const rsvp: MutationResolvers['rsvp'] = async (_, { talkId }, ctx) => {
  try {
    const [rsvped] = await db('attendee_talks')
      .returning('id')
      .insert({
        attendeeid: ctx.userId,
        talkid: talkId,
      })
    return !!rsvped
  } catch (e) {
    throw new ApolloError(e)
    return false
  }
}
export default rsvp
