const env = {
  NODE_ENV: process.env.NODE_ENV,
  corsAllowedOrigin: process.env.CORS_ALLOWED_ORIGIN?.split(','),
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI ?? '',
  options: {
    dbName: process.env.SCHEDU_DB_NAME,
  },
}

export default env
