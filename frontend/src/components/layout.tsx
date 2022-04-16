import { useRouter } from "next/router"
import Navbar from "./navbar"

const Layout: React.FC = ({children}) => {

  const router = useRouter()
  const pagesWithoutNavbar = ['/signin']

  return (
    <>
      { pagesWithoutNavbar.includes(router.asPath) ? '' : <Navbar /> }
      <main>{children}</main>
    </>
  )
}

export default Layout