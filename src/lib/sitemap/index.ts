import productUrls from './products.json';
import categoryUrls from './categories.json';

export async function getProductPaths() {
  return productUrls;
}

export async function getCategoryPaths() {
  return categoryUrls;
}
