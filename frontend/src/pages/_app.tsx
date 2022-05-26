import { ApolloProvider } from '@apollo/client'
import Layout from 'components/layout'
import { AuthProvider } from 'context/AuthContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { client } from 'lib/apolloClient'

import 'styles/globals.css'
import 'styles/calendar.css'

const App = ({ Component, pageProps }: AppProps) => {
  const publicPages = ['/signin']
  return (
    <AuthProvider publicPages={publicPages}>
      <ApolloProvider client={client}>
        <Head>
          <title>Schedu</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
