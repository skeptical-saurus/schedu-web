import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'
import env from './env'

const httpLink = createHttpLink({ uri: `${env.apiUrl}/graphql` })
const authLink = setContext(async () => {
  return {
    headers: {
      'id-token': Cookies.get('SCHEDU_FBIDTOKEN') ?? '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
