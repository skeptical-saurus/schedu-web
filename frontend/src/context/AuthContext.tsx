import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { createContext, useContext } from 'react'
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

// TODO: Reusable token getter
const isSignedIn = () =>
  !!document?.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith('SCHEDU_FBIDTOKEN='))
    ?.split('=')[1]

type authContextType = {
  signIn: () => Promise<boolean>
  signOut: () => Promise<boolean>
  isSignedIn: () => boolean
}

const authContextDefaultValues: authContextType = {
  signIn: async () => {
    return await signInWithGoogle()
  },
  signOut: async () => {
    return await signOutFromGoogle()
  },
  isSignedIn: isSignedIn,
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}
