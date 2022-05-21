import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import env from 'lib/env'

if (!getApps().length) {
  initializeApp(env.firebaseConfig)
}

export const auth = getAuth()

export default env.firebaseConfig
