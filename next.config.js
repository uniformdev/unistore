const path = require('path');
const config = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'edge.disstg.commercecloud.salesforce.com',
      'images.ctfassets.net',
      's3-alpha-sig.figma.com',
      'images.unsplash.com',
    ],
  },
  env: {
    THEME: process.env.THEME || 'light',
  },
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'unistore',
    outputType: process.env.UNIFORM_OUTPUT_TYPE || 'standard',
  },
  swcMinify: false,
  publicRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = config;
