import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { RootComponentInstance } from '@uniformdev/canvas';
import { getCompositionBySlug } from '@/lib/canvasClient';
import CommonPageContainer from '@/components/containers/CommonContainer';

const Home: NextPage<{
  composition: any;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<{
  composition: RootComponentInstance;
}> = async context => ({
  props: {
    composition: await getCompositionBySlug('/', context),
    preview: context.preview || false,
  },
});

export default Home;
