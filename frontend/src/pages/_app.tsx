import Layout from 'components/layout'
import type { AppProps } from 'next/app'

import 'styles/globals.css'
import 'styles/calendar.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
