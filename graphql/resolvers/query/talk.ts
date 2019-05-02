import { first } from 'lodash/fp'
import db from '../../../db'
import { QueryResolvers, Talk } from '../../../generated/graphql'
const talk: QueryResolvers['talk'] = async (_, { id }) =>
  first<Talk>(await db('talk').where('id', id))
export default talk
