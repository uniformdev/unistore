import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { RootComponentInstance } from '@uniformdev/canvas';
import { getTopNavCategoryLinks } from '@/utils/commerce';
import { getCompositionBySlug, getCompositionPaths } from '@/utils/canvas';
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
  const slug = context?.params?.id as string;
  const { preview } = context;
  return {
    props: {
      composition: await getCompositionBySlug(slug, context),
      topNavCategoryLinks: (await getTopNavCategoryLinks()) as Array<NavLinkProp>,
      preview: Boolean(preview),
    },
  };
};

export async function getStaticPaths() {
  const paths = await getCompositionPaths();
  return { paths, fallback: true };
}

export default CanvasComposition;
