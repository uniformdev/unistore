import getConfig from 'next/config';
import { createBigCommerceClient } from '@uniformdev/canvas-bigcommerce';
import { AddCartItemsRequest, DeleteCartItemRequest, PutCartItemRequest } from '@/typings/cartTypes';
import { sluggify } from './stringUtils';

const { commerceProxyURL } = getConfig().publicRuntimeConfig;

export const commerceClient = createBigCommerceClient({
  storeHash: process.env.BIGCOMMERCE_STORE_HASH!,
  token: process.env.BIGCOMMERCE_TOKEN!,
});

const REQUEST_OPTIONS: RequestInit = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

export const getProductsHash = async (): Promise<{ [key: string]: Type.Product }> => {
  const response = await fetch(`${commerceProxyURL}/api/products/get-hash`);
  if (!response.ok) throw new Error('get products hash request error');
  return response.json();
};

export const getProductById = async (id: number): Promise<Type.Product | null> => {
  const response = await fetch(`${commerceProxyURL}/api/products/get-by-id?id=${id}`);
  if (!response.ok) throw new Error('get products by ids request error');
  return response.json();
};

export const getBrands = async (): Promise<Array<Brand.BrandFull>> => {
  const response = await fetch(`${commerceProxyURL}/api/brands/get`);
  if (!response.ok) throw new Error('get brands hash request error');
  return response.json();
};

export const getCategories = async (): Promise<Category.CategoryShort[]> => {
  const response = await fetch(`${commerceProxyURL}/api/categories/get`);
  if (!response.ok) throw new Error('get categories hash request error');
  return response.json();
};

export const getTopNavCategoryLinks = async () => {
  const categories = await getCategories();
  return categories
    .filter(c => c.id !== 23)
    ?.slice(0, 4)
    .map(c => {
      return { title: c.name, href: `/shop/${sluggify(c.name)}/` };
    });
};

export const getProductsByCategories = async (categories: number[]): Promise<Type.Product[]> => {
  const productsHash = await getProductsHash();
  return Object.values(productsHash).filter(product => product.categories.some(c => categories.includes(c)));
};

export const getPaginatedProducts = async ({
  keyword = '',
  category = '',
  brand = '',
  page = 1,
  params = '',
  limit = 9,
}: {
  keyword?: string;
  category?: string;
  brand?: string;
  page?: number;
  params?: string | string[];
  limit?: number;
}): Promise<{ data: Type.Product[]; total: number }> => {
  const getParams = params?.toString().split('-');
  const [sort = '', direction = ''] = getParams || [];

  const response = await fetch(
    `${commerceProxyURL}/api/products/get?keyword=${keyword}&sort=${sort}&direction=${direction}&category=${category}&brand=${brand}&page=${page}${
      limit ? `&limit=${limit}` : ''
    }`
  );

  if (!response.ok) throw new Error('get paginated products request error');

  const { data, meta } = await response.json();

  return { data, total: meta.pagination.total };
};

export const convertCommerceModel = async (data: any) => {
  return fetch(`${commerceProxyURL}/api/actions/convert/commerce-model`, {
    ...REQUEST_OPTIONS,
    method: 'post',
    body: JSON.stringify(data),
  }).then(res => res.json());
};

export const getCartProducts = () =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'get',
  });

export const addToCart = (body: AddCartItemsRequest) =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'post',
    body: JSON.stringify(body),
  });

export const updateCart = (body: PutCartItemRequest) =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'put',
    body: JSON.stringify(body),
  });

export const removeFromCart = (body: DeleteCartItemRequest) =>
  fetch(`${commerceProxyURL}/api/cart`, {
    ...REQUEST_OPTIONS,
    method: 'delete',
    body: JSON.stringify(body),
  });
