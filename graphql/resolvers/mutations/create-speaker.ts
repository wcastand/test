import db from '../../../db'
import { MutationResolvers } from '../../../generated/graphql'
const createSpeaker: MutationResolvers['createSpeaker'] = async (
  _,
  { speaker: { talks, ...speaker } },
) =>
  await db.transaction(async trx => {
    try {
      const [newSpeaker] = await trx('speaker')
        .insert(speaker)
        .returning('*')
      if (talks)
        await trx('speaker_talks').insert(
          talks.map(talkid => ({ speakerid: newSpeaker.id, talkid })),
        )
      return newSpeaker
    } catch (e) {
      console.log(e)
      trx.rollback()
      throw new Error('Something went wrong.')
    }
  })
export default createSpeaker
