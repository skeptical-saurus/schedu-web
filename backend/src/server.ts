import express from 'express'

import 'config/firebase'
import env from 'config/env'
import authRouter from 'routes/auth'
import { validateToken } from 'middlewares/auth'

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.use('/auth', validateToken, authRouter)

app.listen(env.port, () => {
  console.log(`Server is listening on port ${env.port}`)
})
