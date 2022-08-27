import React, { useState, useContext } from 'react';
import Image from 'next/image';
import CurrentProductContext from '@/lib/hooks/currentProduct';
import { useCartContext } from '@/context/CartProvider';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ButtonAddToCart from '@/components/atoms/ButtonAddToCart';

const ProductInfo = () => {
  const product = useContext(CurrentProductContext);
  if (!product) return null;
  const { name, price, shortDescription, rating, reviewCount } = product || {};
  const { currency } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="md:pt-8 pt-4 lg:w-2/3">
      <p className="font-overpass font-bold dark:text-white text-black text-4xl lg:text-5xl">{name}</p>
      <div className="flex flex-row w-28 justify-between mt-8 leading-5 font-overpass text-black text-2xl">
        <CurrencyFormatter currency={currency.code} amount={price} className="dark:text-white" />
      </div>

      <div className="flex items-center pt-6">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Rating star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{rating}</p>
        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
        <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
          {reviewCount} reviews
        </a>
      </div>

      <div
        className="font-overpass dark:text-white text-black text-base pt-6 leading-6"
        dangerouslySetInnerHTML={{ __html: shortDescription || '' }}
      />
      <div className="border-mercury border-t-2 my-7" />
      <div className="font-overpass dark:text-white text-black text-base  pt-6 flex">
        <div className="flex w-3/5 items-center justify-between">
          <div className="inline font-bold">QUANTITY:</div>
          <div>{quantity}</div>
          <div className="flex flex-row w-20">
            <button
              type="button"
              disabled={quantity === 1}
              className="border-demo_border items-center flex justify-center rounded"
              onClick={() => setQuantity(quantity - 1)}
            >
              <Image src="/img/remove.svg" width={50} height={50} />
            </button>
            <button
              type="button"
              disabled={quantity === 100}
              className="border-demo_border  items-center flex justify-center rounded"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Image src="/img/add.svg" width={50} height={50} />
            </button>
          </div>
        </div>
      </div>
      <ButtonAddToCart product={product} quantity={quantity} className="dark:text-white mt-10 w-full" />
    </div>
  );
};

export default ProductInfo;
