import Layout from 'components/layout'
import AuthGuard from 'components/auth-guard'
import type { AppProps } from 'next/app'

import 'styles/globals.css'
import 'styles/calendar.css'

const App = ({ Component, pageProps }: AppProps) => {
  const publicPages = ['/signin']
  return (
    <AuthGuard publicPages={publicPages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthGuard>
  )
}

export default App
