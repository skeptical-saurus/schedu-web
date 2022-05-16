const env = {
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI ?? '',
  options: {
    dbName: process.env.SCHEDU_DB_NAME,
  },
}

export default env
