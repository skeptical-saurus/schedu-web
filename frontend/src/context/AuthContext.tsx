import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ky from 'ky'
import { auth } from 'lib/firebase'
import env from 'lib/env'

const provider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.idToken
    const user = result.user

    await ky.get(`${env.apiUrl}/auth/verify`, {
      headers: {
        'id-token': await user.getIdToken(),
      },
    })
    // store a firebase idToken cookie with 1-hour ttl
    let expireAt = new Date()
    let nextOneHour = expireAt.getTime() + 3600 * 1000
    expireAt.setTime(nextOneHour)
    document.cookie = `SCHEDU_FBIDTOKEN=${token};expires=${expireAt};path=/`

    return true
  } catch (error: any) {
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.log(error.message)
    return false
  }
}

const signOutFromGoogle = async () => {
  try {
    await signOut(auth)

    // remove firebase idToken from cookies
    document.cookie = `SCHEDU_FBIDTOKEN=;expires=Thu, 01 Jan 1970 00:00:01 GMT`

    return true
  } catch (error: any) {
    console.log(error.message)
    return false
  }
}

type authContextType = {
  signIn: () => Promise<boolean>
  signOut: () => Promise<boolean>
  user: User | null
}

const authContextDefaultValues: authContextType = {
  signIn: signInWithGoogle,
  signOut: signOutFromGoogle,
  user: null,
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export const useAuth = () => {
  return useContext(AuthContext)
}

interface AuthProviderProps {
  publicPages: string[]
  children?: React.ReactNode
}

export const AuthProvider = ({ publicPages, children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [authorized, setAuthorized] = useState(false)
  const [delayed, setDelayed] = useState(false)
  const router = useRouter()

  auth.onAuthStateChanged(setUser)
  auth.onIdTokenChanged(setUser)

  const hasAuthCookie = () =>
    !!document?.cookie
      ?.split('; ')
      ?.find((row) => row.startsWith('SCHEDU_FBIDTOKEN='))
      ?.split('=')[1]

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(true), 500)
    return () => clearTimeout(timeout)
  })

  useEffect(() => {
    const isAccessible = publicPages.includes(router.asPath) || !!user || hasAuthCookie()
    if (!isAccessible) {
      router.push('/signin')
    }
    setAuthorized(isAccessible)
  }, [router, user, publicPages])

  return (
    <AuthContext.Provider value={{ user, signIn: signInWithGoogle, signOut: signOutFromGoogle }}>
      {delayed && authorized ? (
        children
      ) : (
        <div className='flex justify-center items-center w-full h-screen'>
          <div className='animate-spin'>Loading...</div>
        </div>
      )}
    </AuthContext.Provider>
  )
}
