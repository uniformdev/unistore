import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { RootComponentInstance } from '@uniformdev/canvas';
import { getTopNavCategoryLinks } from '@/utils/navUtils';
import { getCompositionBySlug, getCompositionPaths } from '@/utils/canvasClient';
import CommonPageContainer from '@/components/containers/CommonContainer';
import { NavLinkProp } from '@/components/atoms/NavLink';

const CanvasComposition: NextPage<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
}> = async context => {
  const { preview } = context;
  const { slug } = context?.params || {};
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  let slashedSlug = slugString as string;
  if (!slugString) {
    slashedSlug = '/';
  }
  return {
    props: {
      composition: await getCompositionBySlug(slashedSlug, context),
      topNavCategoryLinks: (await getTopNavCategoryLinks()) as Array<NavLinkProp>,
      preview: Boolean(preview),
    },
    revalidate: 2,
  };
};

export async function getStaticPaths() {
  const paths = await getCompositionPaths();
  return { paths, fallback: true };
}

export default CanvasComposition;
