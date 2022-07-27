import preval from 'next-plugin-preval';
import { ProductResult } from '@uniformdev/canvas-bigcommerce';
import { fetchAndRetry } from '@/utils/fetchAndRetry';
import { bigCommerceClient } from '@/utils/bigCommerce';

async function getProductDetails(): Promise<any> {
  const options: any = {
    include: ['variants', 'images'],
  };
  const { products } = await fetchAndRetry(async () => bigCommerceClient.getProducts(options));
  if (!products) {
    return null;
  }
  return products.reduce<Record<string, ProductResult>>((productsById, product) => {
    const key = product.id;
    if (!key) {
      return productsById;
    }
    /* eslint-disable no-param-reassign */
    productsById[key] = product;
    return productsById;
    /* eslint-enable no-param-reassign */
  }, {});
}

export default preval(getProductDetails());
