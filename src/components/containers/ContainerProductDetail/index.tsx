import React from 'react';
import { Slot } from '@uniformdev/canvas-react';

const ContainerProductDetail = () => (
  <div className="pb-24 flex flex-col lg:flex-row">
    <div className="flex flex-1 justify-center lg:min-w-max">
      <Slot name="left" />
    </div>
    <div className="flex justify-center">
      <Slot name="right" />
    </div>
  </div>
);

export default ContainerProductDetail;
