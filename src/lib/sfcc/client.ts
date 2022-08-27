import { IntegrationSettings, QueryClient } from './types';
import { makeSalesforceClient } from './salesforce.client';

export const makeQueryClient = ({ settings }: { settings: IntegrationSettings }): QueryClient => {
  return makeSalesforceClient({ settings });
};
