/** @type {import('next').NextConfig} */
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === "development",
  maximumFileSizeToCacheInBytes: 5000000
})

const nextConfig = {
  env: {
    SERVER_URI: process.env.SERVER_URI,
  },
  images: {
    domains: ['localhost','porfolio-omega-red.vercel.app']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  }
}

export default withPWA(nextConfig)