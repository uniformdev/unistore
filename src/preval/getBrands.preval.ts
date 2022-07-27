import preval from 'next-plugin-preval';
import { fetchAndRetry } from '@/utils/fetchAndRetry';
import { bigCommerceRootUrl, bigCommerceRequestHeaders, bigCommerceConfig } from '@/utils/bigCommerce/constants';

async function getBrands(): Promise<any> {
  const brands = await fetchAndRetry(fetchBrands);
  if (!brands) {
    return null;
  }
  return brands;
}

async function fetchBrands() {
  const response = await fetch(`${bigCommerceRootUrl}catalog/brands?limit=${bigCommerceConfig.apiBrandLimit}`, {
    headers: bigCommerceRequestHeaders,
  });
  const { data: brands } = await response.json();
  return brands;
}

export default preval(getBrands());
