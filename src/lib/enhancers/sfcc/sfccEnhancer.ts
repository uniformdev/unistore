import {
  createSalesforceCommerceCloudEnhancer,
  makeBackendClient,
} from "@uniformdev/canvas-salesforce-commerce-cloud";

function validateAndGetEnvVars<K extends string>(envVarKeys: K[]) {
  const envVars: Record<K, string> = {} as Record<K, string>;
  const errors: string[] = [];

  envVarKeys.forEach((envVar) => {
    const value = process.env[envVar];
    if (
      typeof value === "undefined" ||
      (typeof value === "string" && value === "")
    ) {
      errors.push(envVar);
    }
    envVars[envVar] = value!;
  });

  return { envVars, errors };
}

function getConfiguration() {
  const config = validateAndGetEnvVars([
    "SALESFORCE_COMMERCE_CLOUD_CLIENT_ID",
    "SALESFORCE_COMMERCE_CLOUD_CLIENT_SECRET",
    "SALESFORCE_COMMERCE_CLOUD_ORG_ID",
    "SALESFORCE_COMMERCE_CLOUD_SHORT_CODE",
    "SALESFORCE_COMMERCE_CLOUD_SITE_ID",
    "SALESFORCE_COMMERCE_CLOUD_EINSTEIN_SITE_ID",
    "SALESFORCE_COMMERCE_CLOUD_EINSTEIN_ID",
  ]);

  return config;
}

export const sfccEnhancer = () => {
  const { envVars } = getConfiguration();

  const baseClientConfig = {
    clientId: envVars.SALESFORCE_COMMERCE_CLOUD_CLIENT_ID,
    clientSecret: envVars.SALESFORCE_COMMERCE_CLOUD_CLIENT_SECRET,
    organizationId: envVars.SALESFORCE_COMMERCE_CLOUD_ORG_ID,
    shortCode: envVars.SALESFORCE_COMMERCE_CLOUD_SHORT_CODE,
    siteId: envVars.SALESFORCE_COMMERCE_CLOUD_SITE_ID,
    einsteinId: envVars.SALESFORCE_COMMERCE_CLOUD_EINSTEIN_ID,
    einsteinSiteId: envVars.SALESFORCE_COMMERCE_CLOUD_EINSTEIN_SITE_ID,
  };

  const backendClient = makeBackendClient(baseClientConfig);

  return createSalesforceCommerceCloudEnhancer({
    clientConfig: {
      ...baseClientConfig,
      backendClient,
    },
  });
};
