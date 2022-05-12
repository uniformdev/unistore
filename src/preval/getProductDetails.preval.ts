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
    productsById[product.id!] = product;
    return productsById;
  }, {});
}

export default preval(getProductDetails());
