import Layout from 'components/layout'
import { AuthProvider } from 'context/AuthContext'
import type { AppProps } from 'next/app'

import 'styles/globals.css'
import 'styles/calendar.css'

const App = ({ Component, pageProps }: AppProps) => {
  const publicPages = ['/signin']
  return (
    <AuthProvider publicPages={publicPages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App
