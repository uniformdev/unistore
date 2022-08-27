import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { AddCartItemsRequest, DeleteCartItemRequest, PutCartItemRequest } from '@/typings/cartTypes';
import { commerceRootUrl, commerceRequestHeaders } from '@/utils/commerce';

const CART_ID_COOKIE_NAME = 'cartId';

const constructCartItemsUrl = ({ cartId, itemId }: { cartId: string | undefined; itemId?: string }) => {
  const hasCartIdCookie = typeof cartId !== 'undefined';
  const hasItemId = typeof itemId !== 'undefined';

  if (hasCartIdCookie) {
    if (hasItemId) {
      return `${commerceRootUrl}carts/${cartId}/items/${itemId}?include=redirect_urls`;
    }
    return `${commerceRootUrl}carts/${cartId}/items?include=redirect_urls`;
  }
  // If there is no cartId cookie when adding cart items, resort to creating the cart
  return `${commerceRootUrl}carts?include=redirect_urls`;
};

const constructCartUrl = ({ cartId }: { cartId: string | undefined }) => {
  const hasCartIdCookie = typeof cartId !== 'undefined';

  if (hasCartIdCookie) {
    return `${commerceRootUrl}carts/${cartId}?include=redirect_urls`;
  }
  return `${commerceRootUrl}carts?include=redirect_urls`;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method?.toLowerCase();

  if (method === 'post') {
    await handlePost(req, res);
  } else if (method === 'get') {
    await handleGet(req, res);
  } else if (method === 'delete') {
    // technically we're going to just delete line items in the cart
    // not the cart itself so you may choose to put this on a different
    // endpoint but since we have no functionality to delete carts,
    // lets just add it here for now
    await handleDelete(req, res);
  } else if (method === 'put') {
    await handlePut(req, res);
  } else {
    res.status(500).json({ error: 'Unsupported verb' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: PutCartItemRequest | undefined = req.body as PutCartItemRequest;

  if (!body) {
    res.status(500).json({ error: 'Invalid request body' });
    return;
  }

  const cartId = req.cookies[CART_ID_COOKIE_NAME];

  const endpoint = constructCartItemsUrl({
    cartId,
    itemId: body.item_id,
  });

  const response = await fetch(endpoint, {
    method: 'put',
    body: JSON.stringify({
      line_item: body.line_item,
    }),
    // @ts-ignore
    headers: commerceRequestHeaders,
  });

  const json = await response.json();

  res.status(response.status).json(json);
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: DeleteCartItemRequest | undefined = req.body as DeleteCartItemRequest;

  if (!body) {
    res.status(500).json({ error: 'Invalid request body' });
    return;
  }

  const cartId = req.cookies[CART_ID_COOKIE_NAME];

  const endpoint = constructCartItemsUrl({
    cartId,
    itemId: body.item_id,
  });

  const response = await fetch(endpoint, {
    method: 'delete',
    // @ts-ignore
    headers: commerceRequestHeaders,
  });

  if (response.status === 204) {
    res.setHeader(
      'Set-Cookie',
      serialize('cartId', '', {
        maxAge: -1, // 4 weeks
      })
    );

    res.status(response.status).json(null);
  } else {
    const json = await response.json();
    res.status(response.status).json(json);
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const cartId = req.cookies[CART_ID_COOKIE_NAME];

  const endpoint = constructCartUrl({
    cartId,
  });

  const response = await fetch(endpoint, {
    method: 'get',
    // @ts-ignore
    headers: commerceRequestHeaders,
  });

  try {
    const json = await response.json();
    res.status(response.status).json(json);
  } catch (error) {
    console.log('cart is empty');
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: AddCartItemsRequest | undefined = req.body as AddCartItemsRequest;

  if (!body?.line_items?.length) {
    res.status(500).json({ error: 'POST body does not contain line items.' });
    return;
  }

  const cartId = req.cookies[CART_ID_COOKIE_NAME];

  const endpoint = constructCartItemsUrl({
    cartId,
  });

  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(body),
    // @ts-ignore
    headers: commerceRequestHeaders,
  });

  const json: { data?: { id: string | undefined } } = await response.json();

  if (!cartId && json.data?.id) {
    res.setHeader(
      'Set-Cookie',
      serialize('cartId', json.data.id, {
        maxAge: 60 * 60 * 24 * 28, // 4 weeks
      })
    );
  }

  res.status(response.status).json(json);
};
