const path = require('path');

const config = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['images.ctfassets.net', 's3-alpha-sig.figma.com', 'cdn11.bigcommerce.com', 'images.unsplash.com'],
  },
  env: {
    THEME: process.env.THEME || 'light',
  },
  serverRuntimeConfig: {
    bcStoreHash: process.env.BIGCOMMERCE_STORE_HASH,
    bcApiToken: process.env.BIGCOMMERCE_TOKEN,
    bcProductLimit: process.env.BIGCOMMERCE_PRODUCTS_LIMIT || 20,
    bcBrandLimit: process.env.BIGCOMMERCE_BRANDS_LIMIT || 10,
    bcCategoryLimit: process.env.BIGCOMMERCE_CATEGORIES_LIMIT || 4,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL,
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'unistore',
    outputType: process.env.UNIFORM_OUTPUT_TYPE || 'standard',
  },
  swcMinify: false,
  publicRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    commerceProxyURL: process.env.COMMERCE_PROXY_URL,
  },
};

module.exports = config;
