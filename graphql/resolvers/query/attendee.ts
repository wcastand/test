import { first } from 'lodash/fp'
import db from '../../../db'
import { QueryResolvers, Attendee } from '../../../generated/graphql'
const attendee: QueryResolvers['attendee'] = async (_, { id }) =>
  first<Attendee>(await db('attendee').where('id', id))
export default attendee
