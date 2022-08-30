import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import {
  AddCartItem,
  AddCartItemsRequest,
  DeleteCartItem,
  DeleteCartItemRequest,
  GetCartResponse,
  PutCartItemRequest,
} from '@/typings/cartTypes';
import useCookie from '@/hooks/useCookie';
import { getCartProducts, addToCart, updateCart, removeFromCart } from '@/utils/commerce';

export type Cart = {
  numberItems: number;
  lineItems: GetCartResponse['data']['line_items'];
  cartAmount: GetCartResponse['data']['cart_amount'];
  redirectUrls: GetCartResponse['data']['redirect_urls'];
};

const cartAPI = {
  getCartProducts,
  addToCart,
  updateCart,
  removeFromCart,
};

export type CartContextProps = {
  modalOpen: boolean;
  addingToCart: number | undefined;
  cartLoading: boolean;
  updatingItem: number | undefined;

  cart: Cart | undefined;
  currency: { code: string };

  add: (productId: number, variantId: number, quantity?: number) => Promise<void>;
  update: (itemId: string, data: AddCartItem) => Promise<void>;
  remove: (itemId: string, data: DeleteCartItem) => Promise<void>;
  cartAmount: number;
  setModalOpen: (value: boolean) => void;
};

export const CartContext = createContext<CartContextProps>({
  addingToCart: undefined,
  cartLoading: false,
  updatingItem: undefined,
  cartAmount: 0,

  modalOpen: false,
  cart: undefined,
  currency: { code: 'USD' },
  setModalOpen: () => undefined,

  add: () => Promise.resolve(),
  update: () => Promise.resolve(),
  remove: () => Promise.resolve(),
});

export const CartContextProvider: React.FC = ({ children }) => {
  const [refreshCart, setRefreshCart] = useState<number>();
  const [cart, setCart] = useState<Cart>();
  const [cartQueue, setNewQueue] = useState<AddCartItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setCartSize, deleteCartSize] = useCookie('cartSize', null);

  const [state, setState] = useState<Pick<CartContextProps, 'addingToCart' | 'updatingItem' | 'currency'>>({
    addingToCart: undefined,
    updatingItem: undefined,
    currency: { code: 'USD' },
  });
  const cartAmount = useMemo(() => {
    const cartItems =
      cart && cart.lineItems ? cart.lineItems.physical_items.reduce((acc, a) => acc + a.quantity, 0) : 0;
    const queueItems = cartQueue.reduce((acc, a) => acc + a.quantity, 0);
    return cartItems + queueItems;
  }, [state.addingToCart, state.updatingItem, cart]);

  useEffect(() => {
    if (cartAmount) {
      setCartSize(cartAmount);
      return;
    }
    deleteCartSize();
  }, [cartAmount]);

  const { loading: cartLoading } = useAsync(async () => {
    const response = await cartAPI.getCartProducts();
    if (response.ok) {
      const json: GetCartResponse = await response.json();
      setGetCartResponse(json);
    }
  }, [refreshCart]);

  const setGetCartResponse = (json: GetCartResponse | undefined) => {
    if (!json) {
      setCart(undefined);
      return;
    }

    const lineItems = json.data.line_items;

    setCart(prev => ({
      ...prev,
      lineItems,
      numberItems:
        lineItems.physical_items.length +
        lineItems.digital_items.length +
        lineItems.custom_items.length +
        lineItems.gift_certificates.length,
      cartAmount: json.data.cart_amount,
      redirectUrls: json.data.redirect_urls,
    }));

    setState(prev => ({
      ...prev,
      currency: json.data.currency,
    }));
  };

  const add = async (productId: number, variantId: number, quantity?: number) => {
    if (state.addingToCart) {
      return;
    }
    setNewQueue([...cartQueue, { product_id: productId, variant_id: variantId, quantity: quantity ?? 1 }]);
    setState(prev => ({ ...prev, addingToCart: productId }));

    const body: AddCartItemsRequest = {
      line_items: [
        {
          quantity: quantity ?? 1,
          product_id: productId,
          variant_id: variantId,
        },
      ],
    };

    const response = await cartAPI.addToCart(body);

    if (response.ok) {
      const json: GetCartResponse = await response.json();
      setGetCartResponse(json);
    }
    setNewQueue(
      cartQueue.filter(
        item => item.product_id === productId && item.variant_id === variantId && item.quantity === (quantity ?? 1)
      )
    );
    setState(prev => ({
      ...prev,
      addingToCart: undefined,
    }));

    setRefreshCart(new Date().valueOf());
  };

  const update = async (itemId: string, data: AddCartItem) => {
    if (state.updatingItem) {
      return;
    }
    const currentProduct = cart?.lineItems.physical_items.find(i => i.product_id === data.product_id);
    setNewQueue([
      ...cartQueue,
      {
        product_id: data.product_id,
        variant_id: data.variant_id,
        quantity: currentProduct ? data.quantity - currentProduct.quantity : 1,
      },
    ]);
    setState(prev => ({
      ...prev,
      updatingItem: data.product_id,
    }));

    const body: PutCartItemRequest = {
      item_id: itemId,
      line_item: data,
    };

    const response = await cartAPI.updateCart(body);

    if (response.ok) {
      const json: GetCartResponse = await response.json();

      setGetCartResponse(json);
    }

    setNewQueue(
      cartQueue.filter(item =>
        item.product_id === data.product_id && item.variant_id === data.variant_id && currentProduct
          ? data.quantity - currentProduct.quantity
          : 1
      )
    );
    setState(prev => ({
      ...prev,
      updatingItem: undefined,
    }));
  };

  const remove = async (itemId: string, data: DeleteCartItem) => {
    const body: DeleteCartItemRequest = {
      item_id: itemId,
      line_item: data,
    };

    const response = await cartAPI.removeFromCart(body);

    if (response.status === 200) {
      const json: GetCartResponse = await response.json();
      setGetCartResponse(json);
    } else if (response.status === 204) {
      setGetCartResponse(undefined);
    }
  };

  return (
    <CartContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        cart,
        ...state,
        cartLoading,
        add,
        update,
        remove,
        cartAmount,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
