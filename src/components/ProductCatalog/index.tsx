import React, { useContext } from 'react';
import CurrentCategoryContext from '@/lib/hooks/currentCategory';
import ProductItem from '@/components/ProductItem';
import EmptyContent from '@/atoms/EmptyContent';

const ProductCatalog = ({ currentCategoryProducts }: any) => {
  const { categoryName } = useContext(CurrentCategoryContext) || {};
  return (
    <>
      <div className="md:w-5/6 m-auto pt-16 pb-16">
        {categoryName && (
          <p className="dark:text-white font-overpass md:text-center font-extrabold text-3xl leading-6 text-orange_border mb-6 ">
            {categoryName}
          </p>
        )}
      </div>
      <div className="lg:grid lg:grid-cols-3 flex md:flex-row flex-col flex-wrap items-center justify-center">
        {currentCategoryProducts && Array.isArray(currentCategoryProducts) ? (
          currentCategoryProducts.map((product: any) => <ProductItem key={`product-${product.id}`} product={product} />)
        ) : (
          <EmptyContent title="Sorry there are no products in this category" />
        )}
      </div>
    </>
  );
};

export default ProductCatalog;
