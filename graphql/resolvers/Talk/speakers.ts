import db from '../../../db'
import { TalkResolvers } from '../../../generated/graphql'
const speakers: TalkResolvers['speakers'] = async root =>
  await db('speaker')
    .select('speaker.*')
    .leftJoin('speaker_talks', 'speaker.id', 'speaker_talks.speakerid')
    .where('speaker_talks.talkid', root.id)
export default speakers
