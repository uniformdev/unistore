import React from 'react';
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useCartContext } from '@/context/CartProvider';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ActionButton from '@/components/atoms/ActionButton';
import EmptyContent from '@/atoms/EmptyContent';
import ShoppingCartItem from './ShoppingCartItem';
import { Themes } from '@/utils/navUtils';

const ShoppingCart: NextPage = () => {
  const { cart, currency } = useCartContext();
  const { forcedTheme } = useTheme();
  const { numberItems, lineItems, cartAmount, redirectUrls } = cart || {};
  const products = lineItems?.physical_items ?? [];

  return (
    <div className="body_container">
      {products.length ? (
        <div className="pt-14 lg:mb-28 lg:border-b font-overpass not-italic dark:text-white text-black">
          <table className="flex-1 w-full border-collapse">
            <tbody>
              <tr className="border-b font-bold">
                <td colSpan={3} className="pb-2">
                  <span>ITEM</span>
                </td>
                <td className="lg:pr-20 ">
                  <span>QTY</span>
                </td>
                <td className="lg:text-left text-right">
                  <span>Price</span>
                </td>
              </tr>
              {products.map(product => (
                <ShoppingCartItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
          <div className="pt-11">
            <div className="flex flex-row justify-end">
              <span className="pr-14">Subtotal:</span>
              <span className="font-bold">
                <CurrencyFormatter currency={currency.code} amount={cartAmount} />
              </span>
            </div>
            <div className="flex flex-row justify-end">
              {Boolean(numberItems) && (
                <form action={redirectUrls?.checkout_url} method="post" encType="multipart/form-data" target="_blank">
                  <ActionButton
                    type="submit"
                    className="border-4 border-orange_border mt-5 h-10 w-52 lg:mb-32 dark:text-white"
                  >
                    <span className="dark:text-white text-black font-bold text-sm">Proceed to Checkout</span>
                  </ActionButton>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <EmptyContent
          title="Your shopping cart is empty"
          text="Products added to the cart will appear here."
          imageLink={forcedTheme === Themes.dark ? '/img/cart_white.svg' : '/img/cart.svg'}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
