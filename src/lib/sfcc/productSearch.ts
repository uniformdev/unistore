import { getSearchClient } from './salesforce-backend';

export async function getProductsByCategory(categoryId: string) {
  const searchClient = await getSearchClient();
  const results = await searchClient.productSearch({
    parameters: {
      // Don't ask.. Salesforce API forces you to have a textual query to
      // fetch products, butt apparently one can get around that requirement
      // by passing in a bogus price refinement...
      refine: ['price=(0..999999)', `htype=master`, `cgid=${categoryId}`],
      q: '',
      limit: 10,
    },
  });

  return results.hits?.map(hit => hit.productId) ?? [];
}
