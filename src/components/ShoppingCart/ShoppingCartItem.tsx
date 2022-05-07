import React, { useCallback } from 'react';
import { CartLineItem } from '@/typings/cartTypes';
import { useCartContext } from '@/context/CartProvider';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ShoppingCartProduct from './ShoppingCartProduct';

interface Props {
  product: CartLineItem;
}

const ShoppingCartItem: React.FC<Props> = ({ product }) => {
  const { currency, remove, update } = useCartContext();

  const handleDecreaseProductQuantityButtonClick = useCallback(() => {
    update(product.id, {
      product_id: product.product_id,
      variant_id: product.variant_id,
      quantity: product.quantity - 1,
    });
  }, [product.quantity, update]);

  const handleIncreaseProductButtonClick = useCallback(() => {
    update(product.id, {
      product_id: product.product_id,
      variant_id: product.variant_id,
      quantity: product.quantity + 1,
    });
  }, [product.quantity, update]);

  const handleRemoveProductButtonClick = useCallback(() => {
    remove(product.id);
  }, [product.id, remove]);

  return (
    <tr className="border-b">
      <td colSpan={3}>
        <ShoppingCartProduct {...product} onRemove={handleRemoveProductButtonClick} />
      </td>
      <td className="dark:text-white lg:pt-10 lg:align-text-top">
        <div className="flex">
          <button
            type="button"
            onClick={handleDecreaseProductQuantityButtonClick}
            className={`w-[18px] ${product.quantity > 1 ? 'opacity-100' : 'opacity-30'}`}
            disabled={product.quantity === 1}
          >
            <span>-</span>
          </button>
          <div className="w-[24px] flex justify-center">{product.quantity}</div>
          <button type="button" onClick={handleIncreaseProductButtonClick} className="w-[18px]">
            <span>+</span>
          </button>
        </div>
      </td>
      <td className="lg:pt-10 lg:align-text-top lg:text-left text-right">
        <CurrencyFormatter currency={currency.code} amount={product.list_price} />
      </td>
    </tr>
  );
};

export default ShoppingCartItem;
