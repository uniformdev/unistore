import React from 'react';
import type { NextPage } from 'next';
import { enhance, RootComponentInstance } from '@uniformdev/canvas';
import { createCategoriesBrandsEnhancers } from '@/utils/enhancers';
import { getCompositionBySlug } from '@/utils/canvas';
import { sluggify } from '@/utils/stringUtils';
import { getCategories, getTopNavCategoryLinks } from '@/utils/commerce';
import { NavLinkProp } from '@/components/atoms/NavLink';
import CommonPageContainer from '@/components/containers/CommonContainer';

const ShopCategory: NextPage<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticPaths = async () => {
  const categories: Array<Category.CategoryShort> = (await getCategories()) || [];
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
