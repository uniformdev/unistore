import React, { useContext } from 'react';
import CurrentProductContext from '@/lib/hooks/currentProduct';

export type ProductDescriptionProps = {
  title: string;
};

const ProductDescription = ({ title }: ProductDescriptionProps) => {
  const product = useContext(CurrentProductContext);
  if (!product) return null;
  const { longDescription  } = product || {};

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
          dangerouslySetInnerHTML={{ __html: longDescription || '' }}
        />
      </div>
    </>
  );
};

export default ProductDescription;
