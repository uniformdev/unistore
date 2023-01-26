import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { RootComponentInstance } from '@uniformdev/canvas';
import { getTopNavCategoryLinks } from '@/utils/commerce';
import { getCompositionBySlug } from '@/utils/canvas';
import { NavLinkProp } from '@/components/atoms/NavLink';
import CommonPageContainer from '@/components/containers/CommonContainer';

const Home: NextPage<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<{
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
}> = async context => ({
  props: {
    composition: await getCompositionBySlug('/', context),
    topNavCategoryLinks: (await getTopNavCategoryLinks()) as Array<NavLinkProp>,
    preview: context.preview || false,
  },
});

export default Home;
