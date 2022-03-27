// require('dotenv').config({ path: './.env' })
import express from 'express'

const app = express()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Schedu server is listening on port ${PORT}`))
