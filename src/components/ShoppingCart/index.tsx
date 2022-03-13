import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useCartContext } from '@/context/CartProvider';
import ShoppingItem from '@/components/ShoppingItem';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ActionButton from '@/components/atoms/ActionButton';
import EmptyContent from '@/atoms/EmptyContent';
import { Themes } from '@/utils/navUtils';

const ShoppingCart: NextPage = () => {
  const { cart, currency, remove, add } = useCartContext();
  const { forcedTheme } = useTheme();
  const { numberItems, lineItems, cartAmount, redirectUrls } = cart || { numberItems: 0 };
  const [products, setProducts] = useState(lineItems?.physical_items ?? []);
  useEffect(() => {
    setProducts(lineItems?.physical_items ?? []);
  }, [lineItems?.physical_items]);
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
              {products.map((product, index) => (
                <tr key={`Shopping_item-${index % 2}`} className="border-b">
                  <td colSpan={3}>
                    <ShoppingItem {...product} onRemove={() => remove(product.id)} />
                  </td>
                  <td className="dark:text-white lg:pt-10 lg:align-text-top">
                    <button type="button" onClick={() => add(product.product_id, product.variant_id)}>
                      <span>{product.quantity}&nbsp;&nbsp;+</span>
                    </button>
                  </td>
                  <td className="lg:pt-10 lg:align-text-top lg:text-left text-right">
                    <CurrencyFormatter currency={currency.code} amount={product.list_price} />
                  </td>
                </tr>
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
              {numberItems > 0 && (
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
