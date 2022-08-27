import React from 'react';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import { getCategoryComposition } from '@/lib/canvasClient';
import CommonPageContainer from '@/components/containers/CommonContainer';
import { getCategoryPaths } from '@/lib/sitemap';
import CurrentCategoryContext from '@/lib/hooks/currentCategory';

export default function CategoryPage({
  composition,
  preview,
  categoryName,
}: {
  composition: any;
  preview: boolean;
  categoryName: string;
}) {
  return (
    <CurrentCategoryContext.Provider
      value={{
        categoryName,
      }}
    >
      <CommonPageContainer composition={composition} preview={preview} />;
    </CurrentCategoryContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getCategoryPaths(),
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const categoryId: string = context?.params?.categoryId as string;
  const { preview } = context;
  return {
    props: {
      composition: await getCategoryComposition(categoryId, context),
      categoryName: parseCategoryName(categoryId),
      preview: preview ?? false,
    },
  };
};

function parseCategoryName(categoryId: string) {
  if (!categoryId) {
    return '';
  }
  const categoryNames = categoryId.split('-');
  const categoryName = categoryNames
    .map(word => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  return categoryName;
}
