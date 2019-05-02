import db from '../../../db'
import { SpeakerResolvers } from '../../../generated/graphql'
const talks: SpeakerResolvers['talks'] = async root =>
  await db('talk')
    .select('talk.*')
    .leftJoin('speaker_talks', 'talk.id', 'speaker_talks.talkid')
    .where('speaker_talks.speakerid', root.id)
export default talks
