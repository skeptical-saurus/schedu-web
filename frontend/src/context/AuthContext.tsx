import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { auth } from '../lib/firebase'

const provider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {

    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.idToken
    const user = result.user
    
    // store a firebase idToken cookie with 1-hour ttl
    let expireAt = new Date()
    let nextOneHour = expireAt.getTime() + (3600 * 1000)
    expireAt.setTime(nextOneHour)
    document.cookie = `SCHEDU_FBIDTOKEN=${token};expires=${expireAt};path=/`

  } catch (error: any) {
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.log(error.message)
  }
}

const signOutFromGoogle = async () => {
  try {

    await signOut(auth)

    // remove firebase idToken from cookies
    document.cookie = `SCHEDU_FBIDTOKEN=;expires=Thu, 01 Jan 1970 00:00:01 GMT`

  } catch (error: any) {
    console.log(error.message)
  }
}

type authContextType = {
  signIn: () => void,
  signOut: () => void
}

const authContextDefaultValues: authContextType = {
  signIn: () => { signInWithGoogle() },
  signOut: () => { signOutFromGoogle() }
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}