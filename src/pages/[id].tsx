import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { RootComponentInstance } from '@uniformdev/canvas';
import { getCompositionBySlug, getCompositionPaths } from '@/lib/canvasClient';
import CommonPageContainer from '@/components/containers/CommonContainer';

const CanvasComposition: NextPage<{
  composition: RootComponentInstance;
  preview: boolean;
}> = props => <CommonPageContainer {...props} />;

export const getStaticProps: GetStaticProps<{
  composition: RootComponentInstance;
}> = async context => {
  const slug = context?.params?.id as string;
  const { preview } = context;
  return {
    props: {
      composition: await getCompositionBySlug(slug, context),
      preview: Boolean(preview),
    },
  };
};

export async function getStaticPaths() {
  const paths = await getCompositionPaths();
  return { paths, fallback: true };
}

export default CanvasComposition;
