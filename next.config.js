/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['localhost', 'example.com'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    API_URL: process.env.API_URL
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Intentional build issue: incorrect module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/nonexistent': '/path/that/does/not/exist'
    }
    
    // Another issue: invalid webpack plugin configuration
    config.plugins.push(
      new webpack.DefinePlugin({
        __BUILD_ID__: JSON.stringify(buildId),
        __INVALID_SYNTAX: 'missing quotes and JSON.stringify'
      })
    )
    
    return config
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
}

module.exports = nextConfig