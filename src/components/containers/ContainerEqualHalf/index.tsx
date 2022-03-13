import React from 'react';
import { Slot } from '@uniformdev/canvas-react';

const ContainerEqualHalf = () => (
  <div className="md:pt-20 pt-10 md:flex pb-24">
    <div className="xl:pr-16 md:w-1/2">
      <Slot name="left" />
    </div>
    <div className="flex flex-row flex-wrap pt-16 md:pt-0 md:w-1/2">
      <Slot name="right" />
    </div>
  </div>
);

export default ContainerEqualHalf;
