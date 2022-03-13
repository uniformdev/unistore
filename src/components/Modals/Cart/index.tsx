import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ModalRight from '@/components/Modals/Layouts/ModalRight';
import { useCartContext } from '@/context/CartProvider';
import { CartLineItem } from '@/typings/cartTypes';
import { hiddenScroll } from '@/utils/scroll';
import CartProductItem from '@/components/Modals/Cart/CartProductItem';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import ActionButton from '@/atoms/ActionButton';

const CartContent = () => {
  const {
    cart = {
      numberItems: 0,
      physical_items: [],
      checkout_url: '',
      redirectUrls: { checkout_url: '' },
      lineItems: { numberItems: 0, physical_items: [], checkout_url: '', cartAmount: 0 },
      cartAmount: 0,
    },
    cartAmount,
    currency,
    setModalOpen,
    modalOpen,
  } = useCartContext();
  const { lineItems, redirectUrls } = cart;
  const [products, setProducts] = useState<CartLineItem[]>([]);

  useEffect(() => {
    if (modalOpen) {
      hiddenScroll(document.body, true);
    }
    if (!modalOpen) {
      hiddenScroll(document.body, false);
    }
  }, [modalOpen]);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (lineItems.physical_items.length) {
      setProducts(lineItems.physical_items);
      return;
    }
    closeModal();
  }, [lineItems]);

  return (
    <div className="flex relative h-full flex-col">
      <div className="border-b sticky top-0 w-full h-20 flex justify-around items-center bg-white z-10 lg:py-0 py-2">
        <button className="w-16 h-12 flex justify-around items-center" type="submit" onClick={closeModal}>
          <div className="mr-4">
            <Image src="/img/cross-modal.svg" width={16} height={16} />
          </div>
          <div>Close</div>
        </button>
        <div />
        <div className="flex justify-around items-center text-xl  font-extrabold">
          <div className="mr-3">My Cart</div>
          <div className="mr-3">{cartAmount}</div>
          <div>
            <Image src="/img/cart.svg" width={30} height={30} />
          </div>
        </div>
      </div>
      <div className="flex-1 flex box-border flex-col">
        <div className="flex-1">
          {products.length &&
            products.map(item => (
              <div key={item.id} className="pr-9 pl-5 pb-5 w-full border-b h-auto">
                <CartProductItem key={item.id} {...item} />
              </div>
            ))}
        </div>
        <div className="flex-shrink-0 px-6 py-6 sm:px-6 portrait:sticky md:sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm bg-white">
          <div className="mr-12 ml-8 h-auto">
            <div className="flex justify-between">
              <div className="w-3/10 mt-1.5">Subtotal</div>
              <div className="w-3/5 mt-1.5 text-right">
                <CurrencyFormatter currency={currency.code} amount={cart.cartAmount} />
              </div>
            </div>

            <div className="flex mt-14 border-t-2 justify-between font-extrabold">
              <div className="w-3/10 mt-3.5">Total</div>
              <div className="w-3/5 mt-3.5 text-right">
                <CurrencyFormatter currency={currency.code} amount={cart.cartAmount} />
              </div>
            </div>
            <div className=" mt-12 flex-row">
              <form action={redirectUrls.checkout_url} method="post" encType="multipart/form-data" target="_blank">
                <ActionButton
                  type="submit"
                  width="w-full"
                  className="border-4 border-orange_border mt-5 h-10 w-full lg:mb-32"
                  title="Proceed to Checkout"
                >
                  <span className="text-black font-bold text-sm">Proceed to Checkout</span>
                </ActionButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartModal = () => {
  const { modalOpen, setModalOpen } = useCartContext();
  const closeModal = () => setModalOpen(false);
  return (
    <ModalRight isOpen={modalOpen} closeModal={closeModal}>
      <CartContent />
    </ModalRight>
  );
};

export default CartModal;
