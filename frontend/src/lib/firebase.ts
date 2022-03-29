import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_FIREBASE_APPID,
  measurementId: process.env.NEXT_FIREBASE_MEASUREMENTID,
}

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

export const auth = getAuth()

export default firebaseConfig