/* eslint-disable camelcase */
declare namespace Brand {
  interface BrandFull {
    id: number;
    name: string;
    page_title: string;
    meta_keywords: string[];
    meta_description: string[];
    image_url: string;
    search_keywords: string[];
    custom_url: {
      url: string;
      is_customized: boolean;
    };
  }
}
