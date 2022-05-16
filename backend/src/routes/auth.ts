import { createNewUser, getUserFromGoogleId } from 'controllers/auth'
import { Router } from 'express'

const router = Router()

router.get('/verify', async (req, res) => {
  const userData = req.user!
  try {
    const existingUser = await getUserFromGoogleId(userData.uid)
    if (!existingUser) await createNewUser(req.user)

    res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Something went wrong. Please try again later.' })
  }
})

export default router
