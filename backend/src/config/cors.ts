import env from 'config/env'

export const getCorsOptions = () => ({
  origin: getAllowedOrigin(),
})

export const getAllowedOrigin = () => {
  if (env.NODE_ENV !== 'production') return '*'
  if (env.corsAllowedOrigin) return env.corsAllowedOrigin
  return false
}
