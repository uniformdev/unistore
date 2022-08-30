export type AddCartItem = {
  quantity: number;
  product_id: number;
  variant_id: number;
};

export type DeleteCartItem = {
  product_id: number;
  variant_id: number;
};

export type AddCartItemsRequest = {
  line_items: AddCartItem[] | undefined;
};

export type CartLineItem = {
  id: string;
  name: string;
  image_url: string;
  sku: string;
  list_price: number;
  quantity: number;
  product_id: number;
  variant_id: number;
};

export type GetCartResponse = {
  data: {
    line_items: {
      physical_items: CartLineItem[];
      digital_items: any[];
      custom_items: any[];
      gift_certificates: any[];
    };
    currency: {
      code: string;
    };
    cart_amount: number;
    redirect_urls: {
      checkout_url: string;
    };
  };
};

export type PutCartItemRequest = {
  item_id: string;
  line_item: AddCartItem;
};

export type DeleteCartItemRequest = {
  item_id: string;
  line_item: DeleteCartItem;
};
