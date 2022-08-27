import { z } from 'zod';

export const integrationSettingsSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  clientSecret: z.string().min(1, 'Client Secret is required'),
  organizationId: z.string().min(1, 'Organization ID is required'),
  shortCode: z.string().min(1, 'Short Code is required'),
  siteId: z.string().min(1, 'Site ID is required'),
  einsteinId: z.string().optional(),
  einsteinSiteId: z.string().optional(),
});

export type IntegrationSettings = z.infer<typeof integrationSettingsSchema>;

export const productSelectorSettingsSchema = z
  .object({
    multiple: z.boolean().optional(),
    variant: z.boolean().optional(),
  })
  .nullable();

export type ProductSelectorSettings = z.infer<typeof productSelectorSettingsSchema>;

const selectedProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  variantId: z.string().optional(),
});

type SelectedProduct = z.infer<typeof selectedProductSchema>;

export interface ProductSelectorValue {
  value: SelectedProduct | null | SelectedProduct[];
}

export const productQuerySettingsSchema = z.object({});

export type ProductQuerySettings = z.infer<typeof productQuerySettingsSchema>;

export interface ProductQueryValue {
  count: number;
  category?: string;
  keyword: string;
  sort?: string;
  sortOrder?: string;
}

export const einsteinSettingsSchema = z.object({});

export type EinsteinSettings = z.infer<typeof einsteinSettingsSchema>;

export const einsteinValueSchema = z.object({
  recommender: z.string().min(1, 'Recommender is required'),
  context: z.object({
    products: z.array(selectedProductSchema).optional(),
  }),
});

export type EinsteinValue = z.infer<typeof einsteinValueSchema>;

export interface QueryClient {
  getProducts: ({
    text,
    options,
  }: {
    text?: string;
    options?: {
      category?: string;
      limit?: number;
      offset?: number;
      sort?: string;
      sortOrder?: string;
      variants?: boolean;
    };
  }) => Promise<any>;
  getExactProducts: ({ ids }: { ids: string[] }) => Promise<any[]>;
  getCategories: () => Promise<any[]>;
  getRecommenders: () => Promise<
    {
      name: string;
      description: string;
      recommenderType: string;
    }[]
  >;
  getRecommendations: ({ recommender, context }: EinsteinValue) => Promise<{
    products: any;
  }>;
}

export interface SignalTemplateCompositionValue {
  value: boolean;
}
