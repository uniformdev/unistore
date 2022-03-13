import { sluggify } from '@/utils/stringUtils';

export function useSearchMeta(asPath: string) {
  let pathname = '/search';
  let brand;
  let category;

  // Only access asPath after hydration to avoid a server mismatch
  const path = asPath.split('?')[0];
  const parts = path.split('/');

  let c = parts[2];
  let b = parts[3];

  if (c === 'brands') {
    c = parts[4];
  }

  if (path !== pathname) pathname = path;
  if (c !== category) category = c;
  if (b !== brand) brand = b;

  return { pathname, category, brand };
}

// Removes empty query parameters from the query object
export const filterQuery = (query: any) =>
  Object.keys(query).reduce((obj, key) => {
    const newObject: any = obj;
    if (query[key]?.length) {
      newObject[key] = query[key];
    }
    return newObject;
  }, {});

export const getCategoryPath = (path: string, brand?: string) => {
  const category = sluggify(path);

  return `/shop${brand ? `/brands/${brand}` : ''}${category ? `/${category}` : ''}`;
};

export const getBrandPath = (path: string, category?: string) => {
  const brand = sluggify(path);
  return `/shop${brand ? `/brands/${brand}` : ''}${category ? `/${category}` : ''}`;
};

export const getPageNumber = (value: string): string =>
  typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get(value) || '1' : '1';
