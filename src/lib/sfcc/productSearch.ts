import { getSearchClient } from "./salesforce-backend";

export async function getProductsByCategory(categoryId) {
  const settings = {
    clientId: process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_ID,
    clientSecret: process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_SECRET,
    organizationId: process.env.SALESFORCE_COMMERCE_CLOUD_ORG_ID,
    shortCode: process.env.SALESFORCE_COMMERCE_CLOUD_SHORT_CODE,
    siteId: process.env.SALESFORCE_COMMERCE_CLOUD_SITE_ID,
  };

  process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_ID;

  const searchClient = await getSearchClient({ settings });

  const results = await searchClient.productSearch({
    parameters: {
      // Don't ask.. Salesforce API forces you to have a textual query to
      // fetch products, butt apparently one can get around that requirement
      // by passing in a bogus price refinement...
      refine: ["price=(0..999999)", `htype=master`, `cgid=${categoryId}`],
      q: "",
      limit: 10,
    },
  });

  return results.hits?.map((hit) => hit.productId) ?? [];
}
