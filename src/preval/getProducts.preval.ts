import preval from 'next-plugin-preval';
import { fetchAndRetry } from '@/utils/fetchAndRetry';
import { bigCommerceClient } from '@/utils/bigCommerce';
import { bigCommerceConfig } from '@/utils/bigCommerce/constants';

async function getProducts(): Promise<any> {
  const options: any = {
    include_fields: ['id', 'name'],
    limit: bigCommerceConfig.apiProductLimit,
  };
  const { products } = await fetchAndRetry(async () => bigCommerceClient.getProducts(options));
  if (!products) {
    return null;
  }
  return products;
}

export default preval(getProducts());
