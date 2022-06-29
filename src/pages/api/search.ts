import type { NextApiRequest, NextApiResponse } from 'next';
import { bigCommerceRootUrl, bigCommerceRequestHeaders, bigCommerceConfig } from '@/utils/bigCommerce/constants';

const GET = 'get';
const UNSUPPORTED_VERB = 'Unsupported verb';

interface Options {
  includeFields: string | string[];
  include: string | string[];
  keyword: string | string[] | undefined;
  limit: string | string[];
  categories?: string | string[];
  brand?: string | string[];
  sort?: string | string[];
  direction?: string | string[];
  page?: string | string[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method?.toLowerCase();
  if (method === GET) {
    await handleGet(req, res);
    return;
  }
  res.status(500).json({ error: UNSUPPORTED_VERB });
};

const constructProductUrl = ({
  includeFields,
  include,
  keyword,
  categories,
  brand,
  sort,
  direction,
  page,
  limit,
}: Options) => {
  const includeFieldsQuery = `include_fields=${includeFields.toString()}`;
  const includeQuery = `include=${include.toString()}`;
  const keywordQuery = `${keyword ? `&keyword=${keyword.toString()}` : ''}`;
  const categoriesQuery = `${categories ? `&categories:in=${[categories.toString()]}` : ''}`;
  const brandQuery = `${brand ? `&brand_id=${brand}` : ''}`;
  const sortQuery = `${sort ? `&sort=${sort.toString()}` : ''}`;
  const directionQuery = `${direction ? `&direction=${direction.toString()}` : ''}`;
  const pageQuery = `${page || '1'}`;
  return `${bigCommerceRootUrl}catalog/products?${includeFieldsQuery}&${includeQuery}${keywordQuery}${categoriesQuery}${brandQuery}${sortQuery}${directionQuery}&limit=${limit}&page=${pageQuery}`;
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const endpoint = constructProductUrl({
    includeFields: ['id', 'name', 'price', 'sale_price'],
    include: ['variants', 'images'],
    keyword: req.query.keyword,
    categories: req.query.category,
    brand: req.query.brand,
    sort: req.query.sort,
    direction: req.query.direction,
    limit: req.query.limit || bigCommerceConfig.apiProductLimit,
    page: req.query.page,
  });
  const response = await fetch(endpoint, {
    method: GET,
    headers: bigCommerceRequestHeaders,
  });

  const json = await response.json();

  if (json) {
    res.status(response.status).json(json);
    return;
  }
  res.status(404).json({ error: 'not found' });
};
