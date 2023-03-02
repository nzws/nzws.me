// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  experimental: {
    appDir: true
  },
  reactStrictMode: true
};

module.exports = withBundleAnalyzer(nextConfig);
