import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { auth } from '../lib/firebase'

const provider = new GoogleAuthProvider()

const signIn = async () => {
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
    }
}

type authContextType = {
    signIn: () => void
}

const authContextDefaultValues: authContextType = {
    signIn: () => { signIn() }
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
    return useContext(AuthContext)
}