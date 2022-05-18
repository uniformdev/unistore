import {
  createContentstackEnhancer,
  AddContentstackQueryOptions,
} from '@uniformdev/canvas-contentstack';
import contentstack from 'contentstack';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const {
  contentstackApiKey,
  contentstackDeliveryToken,
  contentstackEnvironment,
} = serverRuntimeConfig;

export const contentstackEnhancer = () => {
  if (!contentstackApiKey) {
    throw new Error('CONTENTSTACK_API_KEY env not set.');
  }

  if (!contentstackDeliveryToken) {
    throw new Error('CONTENTSTACK_DELIVERY_TOKEN env not set.');
  }

  if (!contentstackEnvironment) {
    throw new Error('CONTENTSTACK_ENVIRONMENT env not set.');
  }

  const client = contentstack.Stack({
    api_key: contentstackApiKey,
    delivery_token: contentstackDeliveryToken,
    environment: contentstackEnvironment,
    region: contentstack.Region.US,
  });

  const addEntryQueryOptions = (options: AddContentstackQueryOptions) => {
    const { component, query } = options;
    if (component.type === 'story') {
      return query
        .includeContentType()
        .includeReference(['stories'])
        .addParam('include_dimension', true);
    }
    if (component.type === 'accordion') {
      return query
        .includeContentType()
        .includeReference(['benefits'])
        .addParam('include_dimension', true);
    }
    return query.includeContentType().addParam('include_dimension', true);
  };

  return createContentstackEnhancer({ client, addEntryQueryOptions });
};
