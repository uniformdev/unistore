import React from 'react';
import Carousel from '@/components/Carousel';
import ProductItem from '@/components/ProductItem';

export type RelatedProductsProps = {
  title: string;
  relatedProducts?: Type.Product[];
};

const RelatedProducts = ({ title, relatedProducts }: RelatedProductsProps) => (
  <div className="mt-36">
    <div className="border-t-2 flex">
      <div className="w-fit dark:border-b-gray-800 h-10 border-t-2 border-b-2 border-b-white border-x-2 p-3 px-8 font-bold text-center -mt-10 ">
        {title}
      </div>
    </div>
    <div className="mt-6" />
    {relatedProducts && (
      <div>
        <Carousel>
          {relatedProducts.map((i: Type.Product) => (
            <div key={`featured-product-${i.id}`} className="px-1">
              <ProductItem product={i} />
            </div>
          ))}
        </Carousel>
      </div>
    )}
  </div>
);
export default RelatedProducts;
