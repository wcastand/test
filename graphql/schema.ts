import { gql } from 'apollo-server-micro'

export default gql`
  scalar DateTime
  scalar Date
  scalar EmailAddress
  scalar URL

  directive @authenticate on FIELD_DEFINITION
  directive @authenticateAdmin on FIELD_DEFINITION

  type Speaker {
    id: ID!
    firstname: String!
    lastname: String!
    bio: String!
    avatar: URL!
    talks: [Talk!]
  }
  type Attendee {
    id: ID!
    email: EmailAddress!
    talks: [Talk!]
  }
  type Talk {
    id: ID!
    title: String!
    description: String!
    startDate: DateTime!
    duration: Int!
    spotLeft: Int!
    speakers: [Speaker!]
    attendees: [Attendee!]
  }

  type SpeakersPage {
    items: [Speaker!]!
    limit: Int!
    offset: Int!
    totalResult: Int!
  }
  type TalksPage {
    items: [Talk!]!
    limit: Int!
    offset: Int!
    totalResult: Int!
  }
  type AttendeesPage {
    items: [Attendee!]!
    limit: Int!
    offset: Int!
    totalResult: Int!
  }

  type AuthResponse {
    user: Attendee!
    token: String!
  }

  # input

  input SpeakerInput {
    firstname: String!
    lastname: String!
    bio: String!
    avatar: URL!
    talks: [ID!]
  }

  input TalkInput {
    title: String!
    description: String!
    startDate: DateTime!
    duration: Int!
    speakers: [ID!]!
  }

  # the schema allows the following query
  type Query {
    speakers(limit: Int, offset: Int): SpeakersPage!
    speaker(id: ID!): Speaker!

    talks(limit: Int, offset: Int): TalksPage!
    talk(id: ID!): Talk!

    attendees(limit: Int, offset: Int): AttendeesPage!
    attendee(id: ID!): Attendee!
  }
  # this schema allows the following mutation
  type Mutation {
    createSpeaker(speaker: SpeakerInput!): Speaker! @authenticateAdmin
    createTalk(talk: TalkInput!): Talk! @authenticateAdmin
    rsvp(talkId: ID!): Boolean! @authenticate

    register(email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
    adminLogin(email: String!, password: String!): AuthResponse!
  }
`
