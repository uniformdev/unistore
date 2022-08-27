import { getSearchClient } from "@/lib/sfcc/salesforce-backend";
import { settings } from "@/lib/sfcc";

export async function getAllProductIds(
  offset: number = 0,
  limit: number = 100
) {
  const searchClient = await getSearchClient({ settings });
  let productIds : Array<any> = [];
  let hitCount = 1;
  while (hitCount > 0) {
    console.info(`⏳ Searching for next product batch.`, {
      hitCount,
      offset,
      limit,
    });

    let results = await searchClient.productSearch({
      parameters: {
        // Don't ask.. Salesforce API forces you to have a textual query to
        // fetch products, butt apparently one can get around that requirement
        // by passing in a bogus price refinement...
        refine: ["price=(0..999999)", `htype=master`],
        q: "",
        offset: offset,
        limit: limit,
      },
    });

    if (!results.hits) {
      break;
    }

    hitCount = results.hits.length;
    offset = offset + limit;

    productIds = productIds.concat(results.hits.map((hit) => hit.productId));
  }
  return productIds;
}
