import React, { useState } from 'react';
import Image from 'next/image';
import { useCartContext } from '@/context/CartProvider';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ButtonAddToCart from '@/components/atoms/ButtonAddToCart';

export type ProductInfoProps = {
  product?: Type.Product;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { currency } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;
  return (
    <div className="md:pt-8 pt-4 lg:w-2/3">
      <p className="font-overpass font-bold dark:text-white text-black text-4xl lg:text-5xl">{product.name}</p>
      <div className="flex flex-row w-28 justify-between mt-8 leading-5 font-overpass text-black text-2xl">
        <CurrencyFormatter
          currency={currency.code}
          amount={product.salePrice && product.salePrice !== 0 ? product.salePrice : product.price}
          className="dark:text-white"
        />
        {product.salePrice && product.salePrice !== 0 && (
          <>
            &nbsp;&nbsp;&nbsp;
            <CurrencyFormatter
              className="dark:text-white opacity-50 line-through"
              currency={currency.code}
              amount={product.price}
            />
          </>
        )}
      </div>
      <div className="border-mercury border-t-2 my-7" />
      <p className="font-overpass dark:text-white text-black text-base leading-3">
        <span className="inline font-bold">SKU: </span>
        {product.sku}
      </p>
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
