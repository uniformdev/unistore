import { ComponentParameterEnhancer, compose, EnhancerBuilder } from '@uniformdev/canvas';
import {
  CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
  createBigCommerceEnhancer,
  GetProductsOptions,
  parameterIsBigCommerceProductQuery,
} from '@uniformdev/canvas-bigcommerce';
import { bigCommerceClient, getBrands, getCategories, getProduct, getProductsByCategory } from './bigCommerce';

export const bigCommerceEnhancer = createBigCommerceEnhancer({
  client: bigCommerceClient,
  createProductOptions: () => {
    return {
      // Modify or exclude this property if you want more fields returned from the BigCommerce API
      include_fields: ['id', 'name', 'price'],
    };
  },
  createProductQueryOptions: () => {
    return {
      // Modify or exclude this property if you want more fields returned from the BigCommerce API
      include_fields: ['id', 'name', 'price', 'sale_price'],
      include: ['variants', 'images'],
    };
  },
});

export const createDefaultEnhancerBuilder = () => {
  return new EnhancerBuilder().parameterType(CANVAS_BIGCOMMERCE_PARAMETER_TYPES, bigCommerceEnhancer);
};

export const createProductDetailEnhancers = ({ productId }: { productId: string | undefined }) => {
  return new EnhancerBuilder()
    .data('product', async () => (productId ? await getProduct(productId) : undefined))
    .data('relatedProducts', async () => {
      if (!productId) {
        return undefined;
      }
      const product = await getProduct(productId);
      const categories = product.categories?.map(i => i.toString());
      const relatedProducts = await getProductsByCategory(categories);
      return relatedProducts.filter(p => p.id !== product.id);
    })
    .parameterType(
      CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
      compose(createBigCommerceContextQueryEnhancer({ productId: productId! }), bigCommerceEnhancer)
    );
};

const createBigCommerceContextQueryEnhancer = ({
  productId,
}: {
  productId: string;
}): ComponentParameterEnhancer<string | GetProductsOptions | string[], string | GetProductsOptions | string[]> => {
  return {
    enhanceOne: async options => {
      const { parameter } = options;
      let processedValue = parameter.value;
      if (parameterIsBigCommerceProductQuery(parameter)) {
        const product = await getProduct(productId);
        processedValue = {
          ...parameter.value,
          brand: product?.brand_id?.toString() || undefined,
        };
      }
      return processedValue;
    },
  };
};

export const createCategoriesBrandsEnhancers = () => {
  return new EnhancerBuilder().data('categories', async () => getCategories()).data('brands', async () => getBrands());
};
