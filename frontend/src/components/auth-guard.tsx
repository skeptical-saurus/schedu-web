import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'context/AuthContext'

interface AuthGuardProps {
  publicPages: string[]
  children?: React.ReactNode
}

const AuthGuard = ({ publicPages, children }: AuthGuardProps) => {
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

  return (
    <>
      {delayed && authorized ? (
        children
      ) : (
        <div className='flex justify-center items-center w-full h-screen'>
          <div className='animate-spin'>Loading...</div>
        </div>
      )}
    </>
  )
}

export default AuthGuard