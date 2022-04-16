import Layout from 'components/layout'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

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
