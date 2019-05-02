import { first } from 'lodash/fp'
import db from '../../../db'
import { QueryResolvers, Speaker } from '../../../generated/graphql'
const speaker: QueryResolvers['speaker'] = async (_, { id }) =>
  first<Speaker>(await db('speaker').where('id', id))
export default speaker
