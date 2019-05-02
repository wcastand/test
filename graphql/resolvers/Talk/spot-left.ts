require('dotenv').config()
import db from '../../../db'
import { TalkResolvers } from '../../../generated/graphql'
const spotLeft: TalkResolvers['spotLeft'] = async root => {
  const [{ count }] = await db('attendee')
    .count('attendee.id')
    .leftJoin('attendee_talks', 'attendee.id', 'attendee_talks.attendeeid')
    .where('attendee_talks.talkid', root.id)
  return (process.env.NB_SPOT as any) - count
}
export default spotLeft
