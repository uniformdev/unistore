import React from 'react';
import { ProductResult } from '@uniformdev/canvas-bigcommerce';

export type ProductDescriptionProps = {
  title: string;
  product?: ProductResult;
};

const ProductDescription = ({ title, product }: ProductDescriptionProps) => {
  const { description } = product || {};
  return (
    <>
      <div className="border-t-2 flex">
        <div className="w-fit h-10 border-t-2 border-b-2 dark:border-b-gray-800 border-b-white border-x-2 p-3 px-8 font-bold text-center -mt-10">
          {title}
        </div>
      </div>
      <div className="mt-16">
        <div
          className="font-overpass dark:text-white text-black text-base leading-6"
          dangerouslySetInnerHTML={{ __html: description || '' }}
        />
      </div>
    </>
  );
};

export default ProductDescription;
