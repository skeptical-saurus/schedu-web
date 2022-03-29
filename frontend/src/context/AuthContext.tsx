import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { auth } from '../lib/firebase'

const provider = new GoogleAuthProvider()

const signIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log({credential, token, user})
    } catch (error:any) {
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