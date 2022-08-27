import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { getProductDetailComposition } from '@/lib/canvasClient';
import { getProductPaths } from '@/lib/sitemap';
import CurrentProductContext from '@/lib/hooks/currentProduct';
import CommonPageContainer from '@/components/containers/CommonContainer';

export default function ProductDetailPage({ composition, preview }: { composition: any; preview: boolean }) {
  const { parameters } = composition || {};
  const { currentProduct } = parameters || {};
  return (
    <CurrentProductContext.Provider value={currentProduct?.value}>
      <CommonPageContainer composition={composition} preview={preview} topNavCategoryLinks={[]} />
    </CurrentProductContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getProductPaths(),
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const productId = context?.params?.productId as string;
  const { preview } = context;
  return {
    props: {
      composition: await getProductDetailComposition(productId, context),
      preview: preview ?? false,
    },
  };
};
