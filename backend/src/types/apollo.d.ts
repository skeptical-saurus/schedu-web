import type { DecodedIdToken } from 'firebase-admin/auth'

export interface ApolloContext {
  user: DecodedIdToken
}
