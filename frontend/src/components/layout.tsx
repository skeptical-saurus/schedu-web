import { useRouter } from 'next/router'
import Navbar from './navbar'

const Layout: React.FC = ({ children }) => {
  const router = useRouter()
  const pagesWithoutNavbar = ['/signin']
  const aligner = 'container mx-auto px-8 pt-32 pb-8'

  const hasNavbar = !pagesWithoutNavbar.includes(router.asPath)

  return (
    <>
      {hasNavbar ? <Navbar /> : ''}
      <main className={hasNavbar ? aligner : ''}>{children}</main>
    </>
  )
}

export default Layout
