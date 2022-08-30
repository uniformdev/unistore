import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buildProductDetailLink } from '@/utils/linkUtils';
import NoImage from '../../../public/img/no-image.svg';
import { useCartContext } from '@/context/CartProvider';
import ButtonAddToCart from '@/components/atoms/ButtonAddToCart';
import CurrencyFormatter from '@/components/CurrencyFormatter';

export type ProductItemType = {
  product: Type.Product;
};

const ProductItem = ({ product }: ProductItemType) => {
  const { id, images } = product;
  const { currency } = useCartContext();
  return (
    <div
      className={`group flex flex-1 flex-col w-full md:w-[235px] mb-16 mx-auto mb-auto mt-0 border border-demo_border lg:border-0 mt-[30px]
        lg:mt-[10px] lg:mb-[58px] lg:border-transparent lg:hover:outline-1  lg:hover:outline-solid
        lg:hover:outline-demo_border dark:lg:hover:outline-0 lg:hover:z-[999] lg:hover:dark:border-neutral-200/[.20] hover:outline-none`}
    >
      <div className="relative flex flex-col items-center dark:lg-mt-0 dark:pt-8 lg:px-0 px-[30px] pb-8">
        <Link {...buildProductDetailLink({ id: id ?? '', productName: product.name })}>
          <div className="flex flex-col cursor-pointer items-center w-full">
            <div className="relative p-[10px] lg:-m-[2px] lg:outline-1 lg:outline outline-demo_border bg-white lg:group-hover:outline-transparent dark:lg:group-hover:outline-white">
              <Image width={226} height={237} src={images?.[0]?.url_standard || NoImage} />
            </div>
            <span className="mt-6 font-bold text-xl h-[58px] max-w-[205px] overflow-hidden text-ellipsis text-center">
              {product.name}
            </span>
            <div className="flex flex-col font-overpass h-14">
              {product.salePrice !== 0 && <CurrencyFormatter currency={currency.code} amount={product.salePrice} />}
              <CurrencyFormatter
                className={`${product.salePrice && `dark:text-white opacity-50 line-through`}`}
                currency={currency.code}
                amount={product.price}
              />
            </div>
          </div>
        </Link>
        <ButtonAddToCart
          product={product}
          className="absolute h-[50px] box-border top-full -translate-y-2/4 bg-white border-4 border-havelock_blue border-solid py-0 px-[9px] overflow-hidden text-ellipsis whitespace-nowrap font-bold text-sm leading-8 w-[170px] lg:w-[125px] block lg:hidden lg:group-hover:block"
        />
      </div>
    </div>
  );
};
export default ProductItem;
