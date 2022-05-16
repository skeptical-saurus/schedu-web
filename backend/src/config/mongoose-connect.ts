import mongoose from 'mongoose'
import env from 'config/env'

export default mongoose.connect(env.mongoUri, env.options)
