/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    outputStandalone: true,
  },
  basePath: process.env.BASE_PATH ?? '/',
}

module.exports = nextConfig
