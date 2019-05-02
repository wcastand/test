import db from '../../../db'
import { TalkResolvers } from '../../../generated/graphql'
const attendees: TalkResolvers['attendees'] = async root =>
  await db('attendee')
    .select('attendee.*')
    .leftJoin('attendee_talks', 'attendee.id', 'attendee_talks.attendeeid')
    .where('attendee_talks.talkid', root.id)
export default attendees
