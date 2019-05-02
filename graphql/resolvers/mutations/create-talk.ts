import { UserInputError } from 'apollo-server-core'

import db from '../../../db'
import { MutationResolvers } from '../../../generated/graphql'
const createTalk: MutationResolvers['createTalk'] = async (_, { talk: { speakers, ...talk } }) =>
  await db.transaction(async trx => {
    try {
      const [newTalk] = await trx('talk')
        .insert(talk)
        .returning('*')
      if (speakers.length === 0) throw new UserInputError('A talk needs at least one speaker.')
      await trx('speaker_talks').insert(
        speakers.map(speakerid => ({ speakerid, talkid: newTalk.id })),
      )
      return newTalk
    } catch (e) {
      console.log(e)
      trx.rollback()
      throw new Error('Something went wrong.')
    }
  })

export default createTalk
