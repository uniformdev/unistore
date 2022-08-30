import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { enhance, RootComponentInstance } from '@uniformdev/canvas';
import { createProductDetailEnhancers } from '@/utils/enhancers';
import { canvasClient, getState } from '@/utils/canvas';
import { getTopNavCategoryLinks, getProductsHash } from '@/utils/commerce';
import { sluggify } from '@/utils/stringUtils';
import { NavLinkProp } from '@/components/atoms/NavLink';
import CommonPageContainer from '@/components/containers/CommonContainer';

const ProductDetail: NextPage<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<any> = async context => {
  const productId = context.params?.id as number | undefined;
  const contextSlug = context.params?.slug as string | undefined;
  const { preview } = context;
  if (!contextSlug || !productId) {
    return {
      props: {
        composition: {},
      },
    };
  }

  // fetch the composition by slug "product-detail", in this case all product detail pages will be rendered using this composition
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: 'product-detail',
    state: getState(preview),
  });

  const enhancers = createProductDetailEnhancers({ productId });
  await enhance({ composition, enhancers, context: { preview } });

  return {
    props: {
      composition,
      topNavCategoryLinks: await getTopNavCategoryLinks(),
      preview: preview || false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const productsHash = await getProductsHash();
  const paths = productsHash
    ? Object.values(productsHash).map((product: any) => `/products/${product.id}/${sluggify(product.name)}`)
    : [];
  return {
    paths,
    fallback: false,
  };
};

export default ProductDetail;
