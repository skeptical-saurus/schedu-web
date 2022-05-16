import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'context/AuthContext'

interface AuthGuardProps {
  publicPages: string[]
}

const AuthGuard: React.FC<AuthGuardProps> = ({ publicPages, children }) => {
  const [authorized, setAuthorized] = useState(false)
  const [delayed, setDelayed] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(true), 500)
    return () => clearTimeout(timeout)
  })

  useEffect(() => {
    const isAccessible = publicPages.includes(router.asPath) || isSignedIn()
    if (!isAccessible) {
      router.push('/signin')
    }
    setAuthorized(isAccessible)
  }, [router, isSignedIn, publicPages])

  return <>{delayed && authorized ? children : <>Loading...</>}</>
}

export default AuthGuard
