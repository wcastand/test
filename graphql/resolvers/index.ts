import { EmailAddress, URL } from '@okgrow/graphql-scalars'
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'

import { Resolvers } from '../../generated/graphql'

import speakers from './query/speakers'
import talks from './query/talks'
import attendees from './query/attendees'

import speaker from './query/speaker'
import talk from './query/talk'
import attendee from './query/attendee'

import register from './mutations/register'
import login from './mutations/login'
import adminLogin from './mutations/admin/login'

import rsvp from './mutations/rsvp'
import createSpeaker from './mutations/create-speaker'
import createTalk from './mutations/create-talk'

import attendeeTalks from './Attendee/talks'

import speakerTalks from './Speaker/talks'

import talkSpeakers from './Talk/speakers'
import talkAttendees from './Talk/attendees'
import spotLeft from './Talk/spot-left'

const resolvers: Resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  EmailAddress,
  URL,
  Query: {
    talks,
    speakers,
    attendees,
    speaker,
    talk,
    attendee,
  },
  Mutation: {
    createSpeaker,
    createTalk,
    rsvp,
    register,
    login,
    adminLogin,
  },
  Attendee: { talks: attendeeTalks },
  Speaker: { talks: speakerTalks },
  Talk: {
    speakers: talkSpeakers,
    attendees: talkAttendees,
    spotLeft,
  },
}

export default resolvers
