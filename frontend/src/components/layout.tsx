import { useRouter } from 'next/router'
import Navbar from './navbar'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
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
