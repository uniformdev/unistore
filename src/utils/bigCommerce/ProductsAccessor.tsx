import { ProductResult } from '@uniformdev/canvas-bigcommerce';

export interface PaginationType {
  count: number;
  currentPage: number;
  perPage: number;
  tooMany: boolean;
  total: number;
  totalPages: number;
}

const ProductsAccessor = {
  getProducts: async (
    keyword: string,
    category: string,
    brand: string,
    page: number,
    params?: string | string[],
    limit?: number
  ): Promise<{
    status: boolean;
    data: ProductResult[];
    pagination: PaginationType | null;
  }> => {
    const getParams = params?.toString().split('-');
    const [sort = '', direction = ''] = getParams || [];
    const response = await fetch(
      `/api/search?keyword=${keyword}&sort=${sort}&direction=${direction}&category=${category}&brand=${brand}&page=${page}${
        limit ? `&limit=${limit}` : ''
      }`,
      {
        method: 'get',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const { data, meta } = await response.json();
      const { count, current_page, per_page, too_many, total, total_pages } = meta.pagination;
      return {
        data,
        pagination: {
          count,
          total,
          currentPage: current_page,
          perPage: per_page,
          tooMany: too_many,
          totalPages: total_pages,
        },
        status: response.ok,
      };
    }
    return { data: [], pagination: null, status: response.ok };
  },
};

export default ProductsAccessor;
