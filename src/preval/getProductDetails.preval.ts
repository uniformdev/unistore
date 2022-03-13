import preval from 'next-plugin-preval';
import { fetchAndRetry } from '@/utils/fetchAndRetry';
import { ProductResult } from '@uniformdev/canvas-bigcommerce';
import { bigCommerceClient } from '@/utils/bigCommerce';

async function getProductDetails(): Promise<any> {
  const options: any = {
    include: ['variants', 'images'],
  };
  const { products } = await fetchAndRetry(async () => bigCommerceClient.getProducts(options));
  if (!products) {
    return null;
  }
  return products.reduce((productsById: Array<ProductResult>, product: ProductResult) => {
    productsById[product.id!] = product;
    return productsById;
  }, {});
}

export default preval(getProductDetails());
