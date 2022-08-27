import { Search, Customer, Product } from 'commerce-sdk';
import { IntegrationSettings } from './types';

const settingsToConfig = (settings: IntegrationSettings) => {
  return {
    headers: {} as Record<string, string>,
    parameters: {
      clientId: settings.clientId,
      organizationId: settings.organizationId,
      shortCode: settings.shortCode,
      siteId: settings.siteId,
    },
  };
};

async function getGuestUserAuthToken({ settings }: { settings: IntegrationSettings }) {
  const config = settingsToConfig(settings);

  const base64Auth = Buffer.from(`${settings.clientId}:${settings.clientSecret}`).toString('base64');
  const headers = { Authorization: `Basic ${base64Auth}` };
  const loginClient = new Customer.ShopperLogin(config);

  return await loginClient.getAccessToken({
    headers,
    body: { grant_type: 'client_credentials' },
  });
}

export const getSearchClient = async ({ settings }: { settings: IntegrationSettings }) => {
  const config = settingsToConfig(settings);

  const tokenData = await getGuestUserAuthToken({ settings });

  config.headers['authorization'] = `Bearer ${tokenData.access_token}`;

  return new Search.ShopperSearch(config);
};

export const getProductsClient = async ({ settings }: { settings: IntegrationSettings }) => {
  const config = settingsToConfig(settings);

  const tokenData = await getGuestUserAuthToken({ settings });

  config.headers['authorization'] = `Bearer ${tokenData.access_token}`;

  return new Product.ShopperProducts(config);
};