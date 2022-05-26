export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: Date | string
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: unknown
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: string
  /** The string representation of JavaScript regexp. You may provide it with flags "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  RegExpAsString: unknown
}

export interface Account {
  __typename?: 'Account'
  _id: Scalars['MongoID']
  businessId?: Maybe<Scalars['String']>
  contact?: Maybe<AccountContact>
  firstName?: Maybe<Scalars['String']>
  googleId?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  setting: AccountSetting
}

export interface AccountContact {
  __typename?: 'AccountContact'
  email?: Maybe<Scalars['String']>
  tel?: Maybe<Scalars['String']>
}

export interface AccountSetting {
  __typename?: 'AccountSetting'
  _id?: Maybe<Scalars['MongoID']>
  activeTime: AccountSettingActiveTime
  displayTel?: Maybe<Scalars['Boolean']>
  weekendReceive?: Maybe<Scalars['Boolean']>
}

export interface AccountSettingActiveTime {
  __typename?: 'AccountSettingActiveTime'
  _id?: Maybe<Scalars['MongoID']>
  endAt: Scalars['String']
  startAt: Scalars['String']
}

export interface Appointment {
  __typename?: 'Appointment'
  _id: Scalars['MongoID']
  commMethod?: Maybe<Scalars['String']>
  commUrl?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Date']>
  endAt?: Maybe<Scalars['Date']>
  note?: Maybe<Scalars['String']>
  participants?: Maybe<Array<Maybe<AppointmentParticipants>>>
  sender?: Maybe<Scalars['String']>
  startAt?: Maybe<Scalars['Date']>
  status?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Date']>
}

export interface AppointmentParticipants {
  __typename?: 'AppointmentParticipants'
  _id?: Maybe<Scalars['MongoID']>
  confirmed?: Maybe<Scalars['Boolean']>
  join?: Maybe<Scalars['Boolean']>
  main?: Maybe<Scalars['Boolean']>
  userId?: Maybe<Scalars['String']>
}

export interface AppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface CreateOneAppointmentInput {
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<AppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

export interface CreateOneAppointmentPayload {
  __typename?: 'CreateOneAppointmentPayload'
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>
  /** Created document */
  record?: Maybe<Appointment>
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>
}

export interface ErrorInterface {
  /** Generic error message */
  message?: Maybe<Scalars['String']>
}

export interface Event {
  __typename?: 'Event'
  _id: Scalars['MongoID']
  date?: Maybe<Scalars['Date']>
  title?: Maybe<Scalars['String']>
}

export interface FilterCountAppointmentInput {
  AND?: InputMaybe<Array<FilterCountAppointmentInput>>
  OR?: InputMaybe<Array<FilterCountAppointmentInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountAppointmentOperatorsInput>
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<FilterCountAppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterCountAppointmentOperatorsInput {
  _id?: InputMaybe<FilterCountAppointment_IdOperatorsInput>
}

export interface FilterCountAppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface FilterCountAppointment_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterFindManyAccountContactEmailOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['RegExpAsString']>
}

export interface FilterFindManyAccountContactInput {
  email?: InputMaybe<Scalars['String']>
  tel?: InputMaybe<Scalars['String']>
}

export interface FilterFindManyAccountContactOperatorsInput {
  email?: InputMaybe<FilterFindManyAccountContactEmailOperatorsInput>
}

export interface FilterFindManyAccountGoogleIdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['RegExpAsString']>
}

export interface FilterFindManyAccountInput {
  AND?: InputMaybe<Array<FilterFindManyAccountInput>>
  OR?: InputMaybe<Array<FilterFindManyAccountInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyAccountOperatorsInput>
  businessId?: InputMaybe<Scalars['String']>
  contact?: InputMaybe<FilterFindManyAccountContactInput>
  firstName?: InputMaybe<Scalars['String']>
  googleId?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  setting?: InputMaybe<FilterFindManyAccountSettingInput>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterFindManyAccountOperatorsInput {
  _id?: InputMaybe<FilterFindManyAccount_IdOperatorsInput>
  contact?: InputMaybe<FilterFindManyAccountContactOperatorsInput>
  googleId?: InputMaybe<FilterFindManyAccountGoogleIdOperatorsInput>
}

export interface FilterFindManyAccountSettingActiveTimeInput {
  _id?: InputMaybe<Scalars['MongoID']>
  endAt?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['String']>
}

export interface FilterFindManyAccountSettingInput {
  _id?: InputMaybe<Scalars['MongoID']>
  activeTime?: InputMaybe<FilterFindManyAccountSettingActiveTimeInput>
  displayTel?: InputMaybe<Scalars['Boolean']>
  weekendReceive?: InputMaybe<Scalars['Boolean']>
}

export interface FilterFindManyAccount_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterFindManyAppointmentInput {
  AND?: InputMaybe<Array<FilterFindManyAppointmentInput>>
  OR?: InputMaybe<Array<FilterFindManyAppointmentInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyAppointmentOperatorsInput>
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<FilterFindManyAppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterFindManyAppointmentOperatorsInput {
  _id?: InputMaybe<FilterFindManyAppointment_IdOperatorsInput>
}

export interface FilterFindManyAppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface FilterFindManyAppointment_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterFindManyEventInput {
  AND?: InputMaybe<Array<FilterFindManyEventInput>>
  OR?: InputMaybe<Array<FilterFindManyEventInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyEventOperatorsInput>
  date?: InputMaybe<Scalars['Date']>
  title?: InputMaybe<Scalars['String']>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterFindManyEventOperatorsInput {
  _id?: InputMaybe<FilterFindManyEvent_IdOperatorsInput>
}

export interface FilterFindManyEvent_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterFindOneAccountContactEmailOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['RegExpAsString']>
}

export interface FilterFindOneAccountContactInput {
  email?: InputMaybe<Scalars['String']>
  tel?: InputMaybe<Scalars['String']>
}

export interface FilterFindOneAccountContactOperatorsInput {
  email?: InputMaybe<FilterFindOneAccountContactEmailOperatorsInput>
}

export interface FilterFindOneAccountGoogleIdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['RegExpAsString']>
}

export interface FilterFindOneAccountInput {
  AND?: InputMaybe<Array<FilterFindOneAccountInput>>
  OR?: InputMaybe<Array<FilterFindOneAccountInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneAccountOperatorsInput>
  businessId?: InputMaybe<Scalars['String']>
  contact?: InputMaybe<FilterFindOneAccountContactInput>
  firstName?: InputMaybe<Scalars['String']>
  googleId?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  setting?: InputMaybe<FilterFindOneAccountSettingInput>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterFindOneAccountOperatorsInput {
  _id?: InputMaybe<FilterFindOneAccount_IdOperatorsInput>
  contact?: InputMaybe<FilterFindOneAccountContactOperatorsInput>
  googleId?: InputMaybe<FilterFindOneAccountGoogleIdOperatorsInput>
}

export interface FilterFindOneAccountSettingActiveTimeInput {
  _id?: InputMaybe<Scalars['MongoID']>
  endAt?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['String']>
}

export interface FilterFindOneAccountSettingInput {
  _id?: InputMaybe<Scalars['MongoID']>
  activeTime?: InputMaybe<FilterFindOneAccountSettingActiveTimeInput>
  displayTel?: InputMaybe<Scalars['Boolean']>
  weekendReceive?: InputMaybe<Scalars['Boolean']>
}

export interface FilterFindOneAccount_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterFindOneAppointmentInput {
  AND?: InputMaybe<Array<FilterFindOneAppointmentInput>>
  OR?: InputMaybe<Array<FilterFindOneAppointmentInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneAppointmentOperatorsInput>
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<FilterFindOneAppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterFindOneAppointmentOperatorsInput {
  _id?: InputMaybe<FilterFindOneAppointment_IdOperatorsInput>
}

export interface FilterFindOneAppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface FilterFindOneAppointment_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterFindOneEventInput {
  AND?: InputMaybe<Array<FilterFindOneEventInput>>
  OR?: InputMaybe<Array<FilterFindOneEventInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneEventOperatorsInput>
  date?: InputMaybe<Scalars['Date']>
  title?: InputMaybe<Scalars['String']>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterFindOneEventOperatorsInput {
  _id?: InputMaybe<FilterFindOneEvent_IdOperatorsInput>
}

export interface FilterFindOneEvent_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterUpdateOneAccountContactEmailOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['RegExpAsString']>
}

export interface FilterUpdateOneAccountContactInput {
  email?: InputMaybe<Scalars['String']>
  tel?: InputMaybe<Scalars['String']>
}

export interface FilterUpdateOneAccountContactOperatorsInput {
  email?: InputMaybe<FilterUpdateOneAccountContactEmailOperatorsInput>
}

export interface FilterUpdateOneAccountGoogleIdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  regex?: InputMaybe<Scalars['RegExpAsString']>
}

export interface FilterUpdateOneAccountInput {
  AND?: InputMaybe<Array<FilterUpdateOneAccountInput>>
  OR?: InputMaybe<Array<FilterUpdateOneAccountInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterUpdateOneAccountOperatorsInput>
  businessId?: InputMaybe<Scalars['String']>
  contact?: InputMaybe<FilterUpdateOneAccountContactInput>
  firstName?: InputMaybe<Scalars['String']>
  googleId?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  setting?: InputMaybe<FilterUpdateOneAccountSettingInput>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterUpdateOneAccountOperatorsInput {
  _id?: InputMaybe<FilterUpdateOneAccount_IdOperatorsInput>
  contact?: InputMaybe<FilterUpdateOneAccountContactOperatorsInput>
  googleId?: InputMaybe<FilterUpdateOneAccountGoogleIdOperatorsInput>
}

export interface FilterUpdateOneAccountSettingActiveTimeInput {
  _id?: InputMaybe<Scalars['MongoID']>
  endAt?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['String']>
}

export interface FilterUpdateOneAccountSettingInput {
  _id?: InputMaybe<Scalars['MongoID']>
  activeTime?: InputMaybe<FilterUpdateOneAccountSettingActiveTimeInput>
  displayTel?: InputMaybe<Scalars['Boolean']>
  weekendReceive?: InputMaybe<Scalars['Boolean']>
}

export interface FilterUpdateOneAccount_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface FilterUpdateOneAppointmentInput {
  AND?: InputMaybe<Array<FilterUpdateOneAppointmentInput>>
  OR?: InputMaybe<Array<FilterUpdateOneAppointmentInput>>
  _id?: InputMaybe<Scalars['MongoID']>
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterUpdateOneAppointmentOperatorsInput>
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<FilterUpdateOneAppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

/** For performance reason this type contains only *indexed* fields. */
export interface FilterUpdateOneAppointmentOperatorsInput {
  _id?: InputMaybe<FilterUpdateOneAppointment_IdOperatorsInput>
}

export interface FilterUpdateOneAppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface FilterUpdateOneAppointment_IdOperatorsInput {
  exists?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['MongoID']>
  gte?: InputMaybe<Scalars['MongoID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
  lt?: InputMaybe<Scalars['MongoID']>
  lte?: InputMaybe<Scalars['MongoID']>
  ne?: InputMaybe<Scalars['MongoID']>
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>
}

export interface MongoError extends ErrorInterface {
  __typename?: 'MongoError'
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>
}

export interface Mutation {
  __typename?: 'Mutation'
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  approveAppointment?: Maybe<UpdateByIdAppointmentPayload>
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createAppointment?: Maybe<CreateOneAppointmentPayload>
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  deleteAppointment?: Maybe<RemoveByIdAppointmentPayload>
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  rejectAppointment?: Maybe<UpdateByIdAppointmentPayload>
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateAccount?: Maybe<UpdateOneAccountPayload>
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateAppointment?: Maybe<UpdateOneAppointmentPayload>
}

export interface MutationApproveAppointmentArgs {
  _id: Scalars['MongoID']
  record?: InputMaybe<UpdateByIdAppointmentInput>
}

export interface MutationCreateAppointmentArgs {
  record: CreateOneAppointmentInput
}

export interface MutationDeleteAppointmentArgs {
  _id: Scalars['MongoID']
}

export interface MutationRejectAppointmentArgs {
  _id: Scalars['MongoID']
  record?: InputMaybe<UpdateByIdAppointmentInput>
}

export interface MutationUpdateAccountArgs {
  filter?: InputMaybe<FilterUpdateOneAccountInput>
  record: UpdateOneAccountInput
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortUpdateOneAccountInput>
}

export interface MutationUpdateAppointmentArgs {
  filter?: InputMaybe<FilterUpdateOneAppointmentInput>
  record: UpdateOneAppointmentInput
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortUpdateOneAppointmentInput>
}

export interface Query {
  __typename?: 'Query'
  account?: Maybe<Account>
  accounts: Array<Account>
  appointment?: Maybe<Appointment>
  appointments: Array<Appointment>
  countAppointment?: Maybe<Scalars['Int']>
  currentAccount?: Maybe<Account>
  event?: Maybe<Event>
  events: Array<Event>
  recentContacts: Array<Account>
}

export interface QueryAccountArgs {
  _id: Scalars['MongoID']
}

export interface QueryAccountsArgs {
  filter?: InputMaybe<FilterFindManyAccountInput>
  limit?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortFindManyAccountInput>
}

export interface QueryAppointmentArgs {
  filter?: InputMaybe<FilterFindOneAppointmentInput>
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortFindOneAppointmentInput>
}

export interface QueryAppointmentsArgs {
  filter?: InputMaybe<FilterFindManyAppointmentInput>
  limit?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortFindManyAppointmentInput>
}

export interface QueryCountAppointmentArgs {
  filter?: InputMaybe<FilterCountAppointmentInput>
}

export interface QueryCurrentAccountArgs {
  filter?: InputMaybe<FilterFindOneAccountInput>
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortFindOneAccountInput>
}

export interface QueryEventArgs {
  filter?: InputMaybe<FilterFindOneEventInput>
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortFindOneEventInput>
}

export interface QueryEventsArgs {
  filter?: InputMaybe<FilterFindManyEventInput>
  limit?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortFindManyEventInput>
}

export interface RemoveByIdAppointmentPayload {
  __typename?: 'RemoveByIdAppointmentPayload'
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>
  /** Removed document */
  record?: Maybe<Appointment>
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>
}

export interface RuntimeError extends ErrorInterface {
  __typename?: 'RuntimeError'
  /** Runtime error message */
  message?: Maybe<Scalars['String']>
}

export enum SortFindManyAccountInput {
  ContactEmailAsc = 'CONTACT__EMAIL_ASC',
  ContactEmailDesc = 'CONTACT__EMAIL_DESC',
  GoogleidAsc = 'GOOGLEID_ASC',
  GoogleidDesc = 'GOOGLEID_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortFindManyAppointmentInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortFindManyEventInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortFindOneAccountInput {
  ContactEmailAsc = 'CONTACT__EMAIL_ASC',
  ContactEmailDesc = 'CONTACT__EMAIL_DESC',
  GoogleidAsc = 'GOOGLEID_ASC',
  GoogleidDesc = 'GOOGLEID_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortFindOneAppointmentInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortFindOneEventInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortUpdateOneAccountInput {
  ContactEmailAsc = 'CONTACT__EMAIL_ASC',
  ContactEmailDesc = 'CONTACT__EMAIL_DESC',
  GoogleidAsc = 'GOOGLEID_ASC',
  GoogleidDesc = 'GOOGLEID_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export enum SortUpdateOneAppointmentInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
}

export interface UpdateByIdAppointmentInput {
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<UpdateByIdAppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

export interface UpdateByIdAppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface UpdateByIdAppointmentPayload {
  __typename?: 'UpdateByIdAppointmentPayload'
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>
  /** Updated document */
  record?: Maybe<Appointment>
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>
}

export interface UpdateOneAccountContactInput {
  email?: InputMaybe<Scalars['String']>
  tel?: InputMaybe<Scalars['String']>
}

export interface UpdateOneAccountInput {
  businessId?: InputMaybe<Scalars['String']>
  contact?: InputMaybe<UpdateOneAccountContactInput>
  firstName?: InputMaybe<Scalars['String']>
  googleId?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  setting?: InputMaybe<UpdateOneAccountSettingInput>
}

export interface UpdateOneAccountPayload {
  __typename?: 'UpdateOneAccountPayload'
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>
  /** Updated document */
  record?: Maybe<Account>
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>
}

export interface UpdateOneAccountSettingActiveTimeInput {
  _id?: InputMaybe<Scalars['MongoID']>
  endAt?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['String']>
}

export interface UpdateOneAccountSettingInput {
  _id?: InputMaybe<Scalars['MongoID']>
  activeTime?: InputMaybe<UpdateOneAccountSettingActiveTimeInput>
  displayTel?: InputMaybe<Scalars['Boolean']>
  weekendReceive?: InputMaybe<Scalars['Boolean']>
}

export interface UpdateOneAppointmentInput {
  commMethod?: InputMaybe<Scalars['String']>
  commUrl?: InputMaybe<Scalars['String']>
  createdAt?: InputMaybe<Scalars['Date']>
  endAt?: InputMaybe<Scalars['Date']>
  note?: InputMaybe<Scalars['String']>
  participants?: InputMaybe<Array<InputMaybe<UpdateOneAppointmentParticipantsInput>>>
  sender?: InputMaybe<Scalars['String']>
  startAt?: InputMaybe<Scalars['Date']>
  status?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  updatedAt?: InputMaybe<Scalars['Date']>
}

export interface UpdateOneAppointmentParticipantsInput {
  _id?: InputMaybe<Scalars['MongoID']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  join?: InputMaybe<Scalars['Boolean']>
  main?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export interface UpdateOneAppointmentPayload {
  __typename?: 'UpdateOneAppointmentPayload'
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>
  /** Updated document */
  record?: Maybe<Appointment>
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>
}

export interface ValidationError extends ErrorInterface {
  __typename?: 'ValidationError'
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>
}

export interface ValidatorError {
  __typename?: 'ValidatorError'
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int']
  /** Validation error message */
  message?: Maybe<Scalars['String']>
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>
}
