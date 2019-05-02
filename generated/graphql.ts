export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  URL: any
  DateTime: any
  EmailAddress: any
  Date: any
}

export type Attendee = {
  id: Scalars['ID']
  email: Scalars['EmailAddress']
  talks?: Maybe<Array<Talk>>
}

export type AttendeesPage = {
  items: Array<Attendee>
  limit: Scalars['Int']
  offset: Scalars['Int']
  totalResult: Scalars['Int']
}

export type AuthResponse = {
  user: Attendee
  token: Scalars['String']
}

export type Mutation = {
  createSpeaker: Speaker
  createTalk: Talk
  rsvp: Scalars['Boolean']
  register: AuthResponse
  login: AuthResponse
  adminLogin: AuthResponse
}

export type MutationCreateSpeakerArgs = {
  speaker: SpeakerInput
}

export type MutationCreateTalkArgs = {
  talk: TalkInput
}

export type MutationRsvpArgs = {
  talkId: Scalars['ID']
}

export type MutationRegisterArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationAdminLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Query = {
  speakers: SpeakersPage
  speaker: Speaker
  talks: TalksPage
  talk: Talk
  attendees: AttendeesPage
  attendee: Attendee
}

export type QuerySpeakersArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QuerySpeakerArgs = {
  id: Scalars['ID']
}

export type QueryTalksArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryTalkArgs = {
  id: Scalars['ID']
}

export type QueryAttendeesArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAttendeeArgs = {
  id: Scalars['ID']
}

export type Speaker = {
  id: Scalars['ID']
  firstname: Scalars['String']
  lastname: Scalars['String']
  bio: Scalars['String']
  avatar: Scalars['URL']
  talks?: Maybe<Array<Talk>>
}

export type SpeakerInput = {
  firstname: Scalars['String']
  lastname: Scalars['String']
  bio: Scalars['String']
  avatar: Scalars['URL']
  talks?: Maybe<Array<Scalars['ID']>>
}

export type SpeakersPage = {
  items: Array<Speaker>
  limit: Scalars['Int']
  offset: Scalars['Int']
  totalResult: Scalars['Int']
}

export type Talk = {
  id: Scalars['ID']
  title: Scalars['String']
  description: Scalars['String']
  startDate: Scalars['DateTime']
  duration: Scalars['Int']
  spotLeft: Scalars['Int']
  speakers?: Maybe<Array<Speaker>>
  attendees?: Maybe<Array<Attendee>>
}

export type TalkInput = {
  title: Scalars['String']
  description: Scalars['String']
  startDate: Scalars['DateTime']
  duration: Scalars['Int']
  speakers: Array<Scalars['ID']>
}

export type TalksPage = {
  items: Array<Talk>
  limit: Scalars['Int']
  offset: Scalars['Int']
  totalResult: Scalars['Int']
}

import { MyContext } from '../functions/graphql'

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {}
  Int: Scalars['Int']
  SpeakersPage: SpeakersPage
  Speaker: Speaker
  ID: Scalars['ID']
  String: Scalars['String']
  URL: Scalars['URL']
  Talk: Talk
  DateTime: Scalars['DateTime']
  Attendee: Attendee
  EmailAddress: Scalars['EmailAddress']
  TalksPage: TalksPage
  AttendeesPage: AttendeesPage
  Mutation: {}
  SpeakerInput: SpeakerInput
  TalkInput: TalkInput
  Boolean: Scalars['Boolean']
  AuthResponse: AuthResponse
  Date: Scalars['Date']
}

export type AuthenticateDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AuthenticateAdminDirectiveResolver<
  Result,
  Parent,
  ContextType = MyContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AttendeeResolvers<ContextType = MyContext, ParentType = ResolversTypes['Attendee']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>
  talks?: Resolver<Maybe<Array<ResolversTypes['Talk']>>, ParentType, ContextType>
}

export type AttendeesPageResolvers<
  ContextType = MyContext,
  ParentType = ResolversTypes['AttendeesPage']
> = {
  items?: Resolver<Array<ResolversTypes['Attendee']>, ParentType, ContextType>
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalResult?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type AuthResponseResolvers<
  ContextType = MyContext,
  ParentType = ResolversTypes['AuthResponse']
> = {
  user?: Resolver<ResolversTypes['Attendee'], ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export type MutationResolvers<ContextType = MyContext, ParentType = ResolversTypes['Mutation']> = {
  createSpeaker?: Resolver<
    ResolversTypes['Speaker'],
    ParentType,
    ContextType,
    MutationCreateSpeakerArgs
  >
  createTalk?: Resolver<ResolversTypes['Talk'], ParentType, ContextType, MutationCreateTalkArgs>
  rsvp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, MutationRsvpArgs>
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, MutationRegisterArgs>
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, MutationLoginArgs>
  adminLogin?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    MutationAdminLoginArgs
  >
}

export type QueryResolvers<ContextType = MyContext, ParentType = ResolversTypes['Query']> = {
  speakers?: Resolver<ResolversTypes['SpeakersPage'], ParentType, ContextType, QuerySpeakersArgs>
  speaker?: Resolver<ResolversTypes['Speaker'], ParentType, ContextType, QuerySpeakerArgs>
  talks?: Resolver<ResolversTypes['TalksPage'], ParentType, ContextType, QueryTalksArgs>
  talk?: Resolver<ResolversTypes['Talk'], ParentType, ContextType, QueryTalkArgs>
  attendees?: Resolver<ResolversTypes['AttendeesPage'], ParentType, ContextType, QueryAttendeesArgs>
  attendee?: Resolver<ResolversTypes['Attendee'], ParentType, ContextType, QueryAttendeeArgs>
}

export type SpeakerResolvers<ContextType = MyContext, ParentType = ResolversTypes['Speaker']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  avatar?: Resolver<ResolversTypes['URL'], ParentType, ContextType>
  talks?: Resolver<Maybe<Array<ResolversTypes['Talk']>>, ParentType, ContextType>
}

export type SpeakersPageResolvers<
  ContextType = MyContext,
  ParentType = ResolversTypes['SpeakersPage']
> = {
  items?: Resolver<Array<ResolversTypes['Speaker']>, ParentType, ContextType>
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalResult?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type TalkResolvers<ContextType = MyContext, ParentType = ResolversTypes['Talk']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  spotLeft?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  speakers?: Resolver<Maybe<Array<ResolversTypes['Speaker']>>, ParentType, ContextType>
  attendees?: Resolver<Maybe<Array<ResolversTypes['Attendee']>>, ParentType, ContextType>
}

export type TalksPageResolvers<
  ContextType = MyContext,
  ParentType = ResolversTypes['TalksPage']
> = {
  items?: Resolver<Array<ResolversTypes['Talk']>, ParentType, ContextType>
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalResult?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL'
}

export type Resolvers<ContextType = MyContext> = {
  Attendee?: AttendeeResolvers<ContextType>
  AttendeesPage?: AttendeesPageResolvers<ContextType>
  AuthResponse?: AuthResponseResolvers<ContextType>
  Date?: GraphQLScalarType
  DateTime?: GraphQLScalarType
  EmailAddress?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Speaker?: SpeakerResolvers<ContextType>
  SpeakersPage?: SpeakersPageResolvers<ContextType>
  Talk?: TalkResolvers<ContextType>
  TalksPage?: TalksPageResolvers<ContextType>
  URL?: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = MyContext> = {
  authenticate?: AuthenticateDirectiveResolver<any, any, ContextType>
  authenticateAdmin?: AuthenticateAdminDirectiveResolver<any, any, ContextType>
}

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = MyContext> = DirectiveResolvers<ContextType>
