import { ApolloProvider } from '@apollo/client'
import Layout from 'components/layout'
import AuthGuard from 'components/auth-guard'
import type { AppProps } from 'next/app'
import { client } from 'lib/apolloClient'

import 'styles/globals.css'
import 'styles/calendar.css'

const App = ({ Component, pageProps }: AppProps) => {
  const publicPages = ['/signin']
  return (
    <AuthGuard publicPages={publicPages}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthGuard>
  )
}

export default App
