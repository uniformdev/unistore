import { getProductsClient, getSearchClient } from "./salesforce-backend";

export const settings = {
  clientId: process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_ID,
  clientSecret: process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_SECRET,
  organizationId: process.env.SALESFORCE_COMMERCE_CLOUD_ORG_ID,
  shortCode: process.env.SALESFORCE_COMMERCE_CLOUD_SHORT_CODE,
  siteId: process.env.SALESFORCE_COMMERCE_CLOUD_SITE_ID,
};

export async function getProducts(productIds: Array<string>) {
  const productsClient = await getProductsClient({ settings });
  const { data } = await productsClient.getProducts({
    parameters: {
      ids: productIds.join(","),
    },
  });
  if (data && data.length > 0) {
    return data;
  }
  return [];
}

export async function getProduct(productId: string) {
  if (!productId) {
    return undefined;
  }
  const productsClient = await getProductsClient({ settings });
  const { data } = await productsClient.getProducts({
    parameters: {
      ids: productId,
    },
  });
  if (data && data.length > 0) {
    return data[0];
  }
  return undefined;
}

export async function getProductsByCategory(
  categoryId: string,
  limit: number = 10
) {
  if (!categoryId) {
    return undefined;
  }
  const searchClient = await getSearchClient({ settings });
  const results = await searchClient.productSearch({
    parameters: {
      // Don't ask.. Salesforce API forces you to have a textual query to
      // fetch products, butt apparently one can get around that requirement
      // by passing in a bogus price refinement...
      refine: ["price=(0..999999)", `htype=master`, `cgid=${categoryId}`],
      q: "",
      limit,
    },
  });
  if (!results.hits) {
    return [];
  }
  return getProducts(results.hits.map((hit) => hit.productId));
}