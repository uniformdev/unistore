import React from 'react';
import type { NextPage } from 'next';
import { enhance, ComponentInstance } from '@uniformdev/canvas';
import { CategoryResult } from '@uniformdev/canvas-bigcommerce';
import { createCategoriesBrandsEnhancers } from '@/utils/enhancers';
import { getTopNavCategoryLinks } from '@/utils/navUtils';
import { getCompositionBySlug } from '@/utils/canvasClient';
import { sluggify } from '@/utils/stringUtils';
import { getCategories } from '@/utils/bigCommerce';
import { NavLinkProp } from '@/components/atoms/NavLink';
import CommonPageContainer from '@/components/containers/CommonContainer';

const ShopCategory: NextPage<{
  composition: ComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticPaths = async () => {
  const categories: Array<CategoryResult> = (await getCategories()) || [];
  // add known "shop all" category
  const shopAll: CategoryResult = { id: 23, name: 'Shop All', url: '/shop-all/', children: [] };
  categories.push(shopAll);
  return {
    paths: categories.map(category => `/shop/${sluggify(category.name)}`),
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { categoryname } = context?.params || {};
  const { preview } = context;
  const [categorySpecificComposition, categoryTemplateComposition] = await Promise.all([
    getCompositionBySlug(`product-category-${categoryname}`, preview).catch(compositionExceptionHandler),
    getCompositionBySlug('product-category', preview).catch(compositionExceptionHandler),
  ]);

  const composition = categorySpecificComposition ?? categoryTemplateComposition;

  if (!composition) {
    throw new (Error as any)('Composition not found.');
  }

  const enhancers = createCategoriesBrandsEnhancers();

  await enhance({ composition, enhancers, context: { preview } });

  return {
    props: {
      composition,
      topNavCategoryLinks: await getTopNavCategoryLinks(),
      preview: preview || false,
    },
  };
};

const compositionExceptionHandler = (e: { statusCode: number | undefined }) => {
  if (e.statusCode === 404) {
    return null;
  }

  throw e;
};

export default ShopCategory;
