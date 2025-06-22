// next.config.mjs

import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
      '@/components': path.resolve('./src/components'),
      '@/contexts': path.resolve('./src/contexts'),
      '@/app': path.resolve('./src/app'),
      '@/styles': path.resolve('./src/styles'),
      '@/utils': path.resolve('./src/utils'),
      '@/lib': path.resolve('./src/lib'),
      '@/hooks': path.resolve('./src/hooks'),
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  images: {
    domains: ['api.jacforklift.uz', 'localhost', 'jacforklift.uz'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error'] }
        : false,
  },

  poweredByHeader: false,
  compress: true,

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}

export default nextConfig
