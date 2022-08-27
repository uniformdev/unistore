import 'dotenv/config';
import '../fetch-polyfill';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { getAllProductIds } from './getCatalogData';
import { getProduct } from '@/lib/sfcc';

const PATH_TO_DATA_FOLDER = path.resolve('./src/lib/sitemap');
const PRODUCTS_PATH_TO_CACHE_FILE = `${PATH_TO_DATA_FOLDER}/products.json`;
const CATEGORIES_TO_CACHE_FILE = `${PATH_TO_DATA_FOLDER}/categories.json`;

export const writeFile = async (path: string, content: string, type: string) => {
  await fsPromises.writeFile(path, content);
  console.info(`✅ ${type} data fetched and saved to file successfully`);
};

const generate = async () => {
  console.info(`⏳ Resolving all products in catalog. This could take some time.`);

  const productIds = await getAllProductIds();
  const productUrls = productIds.map(id => `/products/${id}`);
  await writeFile(PRODUCTS_PATH_TO_CACHE_FILE, JSON.stringify(productUrls), 'Products');
  console.info(`✅ Product URLs written to disk at ${PRODUCTS_PATH_TO_CACHE_FILE}`);

  console.info(
    `⏳ Resolving categories. Fetching product info for ${productIds.length} products, this could take some time.`
  );

  const categories = await Promise.all(productIds.map(async id => (await getProduct(id))?.primaryCategoryId));

  console.info(`✅ Product categories resolved.`);

  console.info(`⏳ Generating product category paths.`);

  // parsing category ids separated by dash "-"
  const categoryUrls = new Map();
  categoryUrls.set('newarrivals', 'newarrivals');
  categoryUrls.set('top-seller', 'top-seller');
  categories
    .filter(c => c)
    .forEach(c => {
      categoryUrls.set(c, c);
      const firstSeparator = c?.indexOf('-');
      const topCategory = c?.substring(0, firstSeparator);
      categoryUrls.set(topCategory, topCategory);

      const lastSeparator = c?.lastIndexOf('-');
      const secondCategory = c?.substring(0, lastSeparator);
      categoryUrls.set(secondCategory, secondCategory);
    });

  const categoryPaths = Array.from(categoryUrls.keys()).map(id => `/shop/${id}`);

  console.info(`✅ ${categoryPaths.length} category paths  generated. Start writing to cache. ⏳`);

  await writeFile(CATEGORIES_TO_CACHE_FILE, JSON.stringify(categoryPaths), 'Categories');

  console.info(`✅ Product category URLs are written to cache at ${CATEGORIES_TO_CACHE_FILE}`);
};

generate();
