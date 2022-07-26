import React, { useEffect, useState } from 'react';
import Link from 'next/dist/client/link';
import Image from 'next/image';
import { buildProductDetailLink } from '@/utils/linkUtils';
import NoImage from '../../../../public/img/no-image.svg';
import { useCartContext } from '@/context/CartProvider';
import { CartLineItem } from '@/typings/cartTypes';

const CartProductItem: React.FC<CartLineItem> = ({
  name,
  quantity,
  sku,
  id,
  product_id: productId,
  image_url: imageUrl,
  variant_id: variantId,
}) => {
  const { remove, update, setModalOpen } = useCartContext();
  const getLinkProps = (itemProductId: number, productName: string) =>
    buildProductDetailLink({ id: itemProductId ?? '', productName });

  const [quantityProduct, setProductQuantity] = useState(quantity ?? 0);
  const [isProductUpdate, setProductUpdate] = useState(false);
  const removeFromCart = async () => {
    setProductUpdate(true);
    await remove(id);
    setProductUpdate(false);
  };

  const updateProductQuantity = async (count: number) => {
    setProductQuantity(count);
    setProductUpdate(true);
    if (!count) {
      setProductQuantity(1);
      await removeFromCart();
      return;
    }
    await update(id, {
      product_id: productId,
      variant_id: variantId,
      quantity: count,
    });
    setProductQuantity(count);
    setProductUpdate(false);
  };

  useEffect(
    () => () => {
      setProductUpdate(false);
    },
    []
  );

  const increaseProductQuantity = async (): Promise<void> => updateProductQuantity(quantityProduct + 1);
  const decreaseProductQuantity = async (): Promise<void> => updateProductQuantity(quantityProduct - 1);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row justify-start mt-4">
        <button type="submit" onClick={closeModal}>
          <Link {...getLinkProps(productId, name)}>
            <div>
              <Image width={120} height={120} src={imageUrl || NoImage} />
            </div>
          </Link>
        </button>
        <div className="flex flex-col justify-center">
          <p className="font-extrabold text-xl mb-2">{name}</p>
          <p className=""> SKU: {sku}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full h-full flex flex-row justify-between items-end">
          <button
            disabled={isProductUpdate}
            type="submit"
            onClick={removeFromCart}
            className={`flex ${!isProductUpdate ? 'opacity-100' : 'opacity-30'} items-end h-10 w-10`}
          >
            <Image src="/img/remove-from-cart.svg" width={43} height={43} />
          </button>
          <div className="font-overpass text-black text-2xl flex flex-row items-end mt-4">
            <span>{quantityProduct}</span>
            <button
              type="button"
              disabled={isProductUpdate || !quantityProduct}
              className={`${!isProductUpdate ? 'opacity-100' : 'opacity-30'} border-demo_border ml-10 h-10 w-10`}
              onClick={decreaseProductQuantity}
            >
              <Image src="/img/remove.svg" width={43} height={43} />
            </button>
            <button
              type="button"
              disabled={isProductUpdate || quantityProduct === 100}
              className={`${!isProductUpdate ? 'opacity-100' : 'opacity-30'} border-demo_border h-10 w-10`}
              onClick={increaseProductQuantity}
            >
              <Image src="/img/add.svg" width={43} height={43} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
