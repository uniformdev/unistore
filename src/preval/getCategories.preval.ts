import preval from 'next-plugin-preval';
import { fetchAndRetry } from '@/utils/fetchAndRetry';
import { bigCommerceRootUrl, bigCommerceRequestHeaders, bigCommerceConfig } from '@/utils/bigCommerce/constants';
import { CategoryFull } from '@/typings/categoryTypes';

async function getCategories(): Promise<any> {
  const categories = await fetchAndRetry(fetchCategories);
  if (!categories) {
    return [];
  }
  return categories;
}

async function fetchCategories() {
  const url = `${bigCommerceRootUrl}catalog/categories?limit=${bigCommerceConfig.apiCategoryLimit}`;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getCategories = await fetch(url, {
    headers: bigCommerceRequestHeaders,
  });
  const { data: categories } = await getCategories.json();
  return categories.map((category: CategoryFull) => ({
    id: category.id,
    name: category.name,
    isVisible: category.is_visible,
    url: category.custom_url.url,
  }));
}

export default preval(getCategories());
