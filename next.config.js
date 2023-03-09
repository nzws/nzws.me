// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // also edit me: api/web/image/route.ts
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com'
      }
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
