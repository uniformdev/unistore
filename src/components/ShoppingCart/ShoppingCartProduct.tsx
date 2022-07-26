import React from 'react';
import Image from 'next/image';
import Link from 'next/dist/client/link';
import NoImage from '../../../public/img/no-image.svg';
import Cross from '../../../public/img/cross.svg';
import { CartLineItem } from '@/typings/cartTypes';
import { buildProductDetailLink } from '@/utils/linkUtils';

interface ShoppingItemProps extends CartLineItem {
  onRemove(): void;
}

const ShoppingCartProduct: React.FC<ShoppingItemProps> = ({
  image_url: imageUrl,
  name,
  sku,
  onRemove,
  product_id: productId,
}) => {
  const linkProps = buildProductDetailLink({ id: productId ?? '', productName: name });

  return (
    <div className="flex lg:flex-row flex-col py-4 lg:py-10 font-overpass">
      <div className="relative p-2 border lg:w-40 w-24 h-24 lg:h-40 cursor-pointer">
        <Link {...linkProps}>
          <div>
            <Image layout="fill" src={imageUrl || NoImage} />
          </div>
        </Link>
      </div>
      <div className="lg:px-10 py-4 lg:py-0 not-italic text-black dark:text-white flex flex-col justify-end">
        <Link {...linkProps}>
          <div className="cursor-pointer">
            <div className="overflow-hidden text-ellipsis lg:whitespace-nowrap lg:max-w-2xl  lg:w-full">
              <span className="lg:text-4xl text-xl font-bold">{name}</span>
            </div>
            <div className="mt-5">
              <span className="font-bold">SKU:&nbsp;</span>
              <span>{sku}</span>
            </div>
          </div>
        </Link>
        <button type="button" className="mt-8 text-left h-5 " onClick={onRemove}>
          <Image objectFit="fill" src={Cross} />
          <span className="text-orange_border font-bold text-center">&nbsp;REMOVE</span>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartProduct;
