/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/public'],
        aggregateTimeout: 300,
        poll: false,
      };
      
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', '@emailjs/browser']
  },
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Configure development server
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' 
              ? '*'
              : 'https://your-production-domain.com',
          },
        ],
      },
    ];
  }
};

module.exports = nextConfig;
