import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { ComponentInstance } from '@uniformdev/canvas';
import { getTopNavCategoryLinks } from '@/utils/navUtils';
import { getCompositionBySlug } from '@/utils/canvasClient';
import { NavLinkProp } from '@/components/atoms/NavLink';
import CommonPageContainer from '@/components/containers/CommonContainer';

const Home: NextPage<{
  composition: ComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<{
  composition: ComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
}> = async context => ({
  props: {
    composition: await getCompositionBySlug('/', context),
    topNavCategoryLinks: (await getTopNavCategoryLinks()) as Array<NavLinkProp>,
    preview: context.preview || false,
  },
});

export default Home;
