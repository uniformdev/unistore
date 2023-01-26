import React from 'react';
import ProductItem from '@/components/ProductItem';
import Carousel from '@/components/Carousel';
import LinkButton from '../atoms/LinkButton';

export type ProductsCarouselProps = {
  title: string;
  seeMoreTitle: string;
  seeMoreUrl: string;
  products: Type.Product[];
};

const ProductsCarousel = ({ title, products, seeMoreTitle, seeMoreUrl }: ProductsCarouselProps) => (
  <div className="pt-16 px-4">
    <p className="dark:text-white font-overpass font-extrabold text-black lg:text-4xl text-2xl text-center">{title}</p>
    {products && Array.isArray(products) && (
      <Carousel>
        {products.map(item => (
          <div key={`featured-product-${item.id}`} className="px-1">
            <ProductItem product={item} />
          </div>
        ))}
      </Carousel>
    )}
    {seeMoreTitle && seeMoreUrl && (
      <div className="pt-6 grid place-items-center">
        <LinkButton href={seeMoreUrl} text={seeMoreTitle} className="mt-8 px-4" />
      </div>
    )}
  </div>
);

export default ProductsCarousel;
