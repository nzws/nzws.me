const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  webpack: config => {
    config.module.rules.push({ test: /\.md$/, use: ['raw-loader'] });
    /*
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    */

    return config;
  },
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true
};

module.exports = withBundleAnalyzer(nextConfig);
