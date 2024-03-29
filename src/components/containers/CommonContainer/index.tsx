import React from 'react';
import dynamic from 'next/dynamic';
import { UniformComposition, UniformSlot, createUniformApiEnhancer } from '@uniformdev/canvas-react';
import { RootComponentInstance } from '@uniformdev/canvas';
import Navbar from '@/components/Navigation/Header';
import Footer from '@/components/Navigation/Footer';
import componentResolver from '@/components/componentResolver';
import { NavLinkProp } from '@/components/atoms/NavLink';

const PreviewDevPanel = dynamic(() => import('@/lib/preview/PreviewDevPanel/PreviewDevPanel'));

const CommonContainer = ({
  composition,
  topNavCategoryLinks,
  preview,
}: {
  preview: boolean;
  composition: RootComponentInstance;
  topNavCategoryLinks: Array<NavLinkProp>;
}) => {
  const enhancer = createUniformApiEnhancer({ apiUrl: '/api/preview' });
  return (
    <>
      <Navbar topNavCategoryLinks={topNavCategoryLinks} />
      {composition ? (
        <UniformComposition behaviorTracking="onLoad" data={composition} contextualEditingEnhancer={enhancer}>
          <div className="body_container">
            <UniformSlot name="content" resolveRenderer={componentResolver} />
          </div>
        </UniformComposition>
      ) : null}
      {preview && <PreviewDevPanel preview={preview} composition={composition} />}
      <Footer />
    </>
  );
};

export default CommonContainer;
