export const config = {
  apiToken: process.env.COMMERCE_TOKEN,
};

export const commerceRequestHeaders = {
  'X-Auth-Token': config.apiToken,
  Accept: 'application/json',
};

//TODO: swap
export const commerceRootUrl = `https://commerceproxy/`;
