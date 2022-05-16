import mongoose from 'mongoose'
import env from 'config/env'

const options = {
    dbName: process.env.SCHEDU_DB_NAME
}

export default mongoose.connect(`${env.mongoUri}`, options)
