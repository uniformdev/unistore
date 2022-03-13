import * as path from 'path';

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.@(tsx|mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: (config: { resolve: { alias: any; extensions: string[] } }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/atoms': path.resolve(__dirname, '../src/components/atoms'),
      '@/containers': path.resolve(__dirname, '../src/components/containers'),
      '@/typings': path.resolve(__dirname, '../typings'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
      '@/pages': path.resolve(__dirname, '../src/pages'),
      '@/context': path.resolve(__dirname, '../src/context'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
    };
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
