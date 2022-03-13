import { BrandResult, CategoryResult, createBigCommerceClient, ProductResult } from '@uniformdev/canvas-bigcommerce';
import { fetchAndRetry } from './fetchAndRetry';
import getCategoriesPreval from '../preval/getCategories.preval';
import getBrandsPreval from '../preval/getBrands.preval';
import getProductsPreval from '../preval/getProducts.preval';
import getProductDetailsPreval from '../preval/getProductDetails.preval';

export const bigCommerceClient = createBigCommerceClient({
  storeHash: process.env.BIGCOMMERCE_STORE_HASH!,
  token: process.env.BIGCOMMERCE_TOKEN!,
});

export async function getCategories(): Promise<CategoryResult[]> {
  return getCategoriesPreval;
}

export async function getBrands(): Promise<BrandResult[]> {
  return getBrandsPreval;
}

export async function getProduct(productId: string): Promise<ProductResult> {
  return getProductDetailsPreval[productId];
}

export async function getProductsRuntime(options: any): Promise<ProductResult[]> {
  const { products } = await fetchAndRetry(async () => bigCommerceClient.getProducts(options));
  return products;
}

export async function getProducts(): Promise<ProductResult[]> {
  return getProductsPreval;
}

export async function getProductsByCategory(categories: string[] | undefined): Promise<ProductResult[]> {
  const { products: relatedProducts } = await fetchAndRetry(async () =>
    bigCommerceClient.getProducts({
      include: ['variants', 'images'],
      categories: categories,
    })
  );
  return relatedProducts;
}
