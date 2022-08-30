/* eslint-disable camelcase */
declare namespace Type {
  interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    price: number;
    categories: number[];
    // synthetic fields
    variantId: number;
    brandId: number | null;
    salePrice: number;
    thumbnailStandardUrl: string;
    images?: {
      id: number;
      sort_order: number;
      url_zoom: string;
      image_url: string | null;
      url_standard: string;
    }[];
  }

  interface PaginationType {
    count: number;
    currentPage: number;
    perPage: number;
    tooMany: boolean;
    total: number;
    totalPages: number;
  }
}
