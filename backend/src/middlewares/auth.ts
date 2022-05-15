import type { RequestHandler } from 'express'
import { getAuth } from 'firebase-admin/auth'

const auth = getAuth()

const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const idToken = req.header('id-token')
    if (!idToken) return res.status(400).json({ message: 'Missing Id-Token header' })

    const decodedToken = await auth.verifyIdToken(idToken)
    const notValidToken = decodedToken.email?.split('@')[1] !== 'it.kmitl.ac.th'
    if (notValidToken) return res.status(401).json({ message: 'Invalid email address' })
    next()
  } catch (error) {
    next(error)
  }
}

const decodeTokenToUser: RequestHandler = async (req, res, next) => {
  const idToken = req.header('id-token')
  if (idToken) {
    try {
      req.user = await auth.verifyIdToken(idToken)
    } catch {
      return res.status(400).json({ message: 'Invalid Id-Token' })
    }
  }
  next()
}

export { validateToken, decodeTokenToUser }
