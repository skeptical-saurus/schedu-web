import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ky from 'ky'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'

import { auth } from 'lib/firebase'
import env from 'lib/env'

const provider = new GoogleAuthProvider()

const verifyAndSetCookie = async (userIdToken: string) => {
  await ky.get(`${env.apiUrl}/auth/verify`, {
    headers: {
      'id-token': userIdToken,
    },
  })
  // store a firebase idToken cookie with 1-hour ttl
  let expireAt = dayjs().add(1, 'hour').toDate()
  Cookies.set('SCHEDU_FBIDTOKEN', userIdToken, { expires: expireAt })
}

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const userIdToken = await user.getIdToken()

    await verifyAndSetCookie(userIdToken)

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
    return true
  } catch (error: any) {
    console.log(error.message)
    return false
  }
}

type authContextType = {
  signIn: () => Promise<boolean>
  signOut: () => Promise<boolean>
}

const authContextDefaultValues: authContextType = {
  signIn: signInWithGoogle,
  signOut: signOutFromGoogle,
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
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  const handleStateChanged = async (user: User | null) => {
    if (user) {
      try {
        if (Cookies.get('SCHEDU_FBIDTOKEN')) {
          const userIdToken = await user.getIdToken()
          await verifyAndSetCookie(userIdToken)
        }
        setAuthenticated(true)
      } catch {
        await signOutFromGoogle()
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    } else {
      // remove firebase idToken from cookies
      Cookies.remove('SCHEDU_FBIDTOKEN')
      setLoading(false)
      setAuthenticated(false)
    }
  }

  useEffect(() => {
    const unSubscribeStateChanged = auth.onAuthStateChanged(handleStateChanged)
    const unSubscribeTokenChanged = auth.onIdTokenChanged(handleStateChanged)

    return () => {
      unSubscribeStateChanged()
      unSubscribeTokenChanged()
    }
  }, [])

  useEffect(() => {
    const isAccessible = publicPages.includes(router.asPath) || authenticated || loading
    if (!isAccessible) {
      router.push('/signin')
    }
  }, [router, publicPages, authenticated, loading])

  return (
    <>
      {!loading ? (
        children
      ) : (
        <div className='flex justify-center items-center w-full h-screen'>
          <div className='animate-spin'>Loading...</div>
        </div>
      )}
    </>
  )
}
