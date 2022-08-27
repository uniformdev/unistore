import React from 'react';
import dynamic from 'next/dynamic';
import { Composition, Slot } from '@uniformdev/canvas-react';
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
}) => (
  <>
    {composition ? (
      <Composition behaviorTracking="onLoad" data={composition} resolveRenderer={componentResolver}>
        <Navbar topNavCategoryLinks={topNavCategoryLinks}>
          {/* <Slot name="header" /> */}
        </Navbar>
        <div className="body_container">
          <Slot name="content" />
        </div>
      </Composition>
    ) : null}
    {preview && <PreviewDevPanel preview={preview} composition={composition} />}
    <Footer />
  </>
);

export default CommonContainer;
