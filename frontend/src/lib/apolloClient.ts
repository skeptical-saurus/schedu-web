import { ApolloClient, InMemoryCache } from '@apollo/client'
import env from './env'

export const client = new ApolloClient({
  uri: env.apiUrl + '/graphql',
  cache: new InMemoryCache(),
  headers: {
    'id-token': 'Input token here',
  },
})
