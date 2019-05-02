import db from '../../../db'
import { AttendeeResolvers } from '../../../generated/graphql'
const talks: AttendeeResolvers['talks'] = async root =>
  await db('talk')
    .select('talk.*')
    .leftJoin('attendee_talks', 'talk.id', 'attendee_talks.talkid')
    .where('attendee_talks.attendeeid', root.id)
export default talks
