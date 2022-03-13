import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig() || {};

const { bcStoreHash, bcApiToken, bcProductLimit, bcBrandLimit, bcCategoryLimit } = serverRuntimeConfig || {};

// adding fallback to process.env since getConfig() returns undefined during preval execution
export const bigCommerceConfig = {
  storeHash: bcStoreHash || process.env.BIGCOMMERCE_STORE_HASH,
  apiToken: bcApiToken || process.env.BIGCOMMERCE_TOKEN,
  apiProductLimit: bcProductLimit || process.env.BIGCOMMERCE_PRODUCTS_LIMIT || 20,
  apiBrandLimit: bcBrandLimit || process.env.BIGCOMMERCE_BRANDS_LIMIT || 10,
  apiCategoryLimit: bcCategoryLimit || process.env.BIGCOMMERCE_CATEGORIES_LIMIT || 4,
};

export const bigCommerceRequestHeaders = {
  'X-Auth-Token': bigCommerceConfig.apiToken,
  Accept: 'application/json',
};

export const bigCommerceRootUrl = `https://api.bigcommerce.com/stores/${bigCommerceConfig.storeHash}/v3/`;
