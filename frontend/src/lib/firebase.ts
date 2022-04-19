import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import firebaseConfig from '../../secret/firebaseConfig'

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

export const auth = getAuth()

export default firebaseConfig
