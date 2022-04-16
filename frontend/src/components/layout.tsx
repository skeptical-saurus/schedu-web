import { useRouter } from "next/router"
import Navbar from "./navbar"

const Layout: React.FC = ({children}) => {

  const router = useRouter()
  const pagesWithoutNavbar = ['/signin']

  return (
    <>
      { pagesWithoutNavbar.includes(router.asPath) ? '' : <Navbar /> }
      <main className='container mx-auto px-8 pt-32 pb-8'>{children}</main>
    </>
  )
}

export default Layout