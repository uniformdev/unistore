export type CategoryFull = {
  id: number;
  parent_id: number;
  name: string;
  description: string;
  views: number;
  sort_order: number;
  meta_keywords: string[];
  meta_description: string;
  layout_file: string;
  image_url: string;
  is_visible: boolean;
  search_keywords: string;
  default_product_sort: string;
  custom_url: {
    url: string;
    is_customized: boolean;
  };
};
