import { initializeApp } from 'firebase/app'

const config = {
    apiKey: process.env.NEXT_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_FIREBASE_AUTHDOMAIN,
    projectId: process.env. NEXT_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_FIREBASE_APPID,
    measurementId: process.env.NEXT_FIREBASE_MEASUREMENTID
}

const app = initializeApp(config)

export default app