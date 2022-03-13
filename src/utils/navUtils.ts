import { getCategories } from './bigCommerce';
import { sluggify } from './stringUtils';

export const getTopNavCategoryLinks = async () => {
  const categories = await getCategories();
  return categories
    ?.slice(0, 5)
    .filter(c => c.id !== 23)
    .map(c => {
      return { title: c.name, href: `/shop/${sluggify(c.name)}/` };
    });
};

export enum Themes {
  dark = 'dark',
  light = 'light',
}
