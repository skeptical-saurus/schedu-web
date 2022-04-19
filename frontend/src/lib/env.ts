const env = {
  NODE_ENV: process.env.NODE_ENV,
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '/api',
}

export default env
