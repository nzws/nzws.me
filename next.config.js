const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({ test: /\.md$/, use: ['raw-loader'] });
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    };

    // https://github.com/developit/nextjs-preact-demo
    const splitChunks = config.optimization && config.optimization.splitChunks;
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups;
      const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test: preactModules
        });
        cacheGroups.commons.name = 'framework';
      } else {
        cacheGroups.preact = {
          name: 'commons',
          chunks: 'all',
          test: preactModules
        };
      }
    }

    if (dev && !isServer) {
      const entry = config.entry;
      config.entry = () =>
        entry().then(entries => {
          entries['main.js'] = ['preact/debug'].concat(
            entries['main.js'] || []
          );
          return entries;
        });
    }

    return config;
  }
};

module.exports = withBundleAnalyzer(nextConfig);
