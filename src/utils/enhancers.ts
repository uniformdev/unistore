import { ComponentParameterEnhancer, compose, EnhancerBuilder } from '@uniformdev/canvas';
import {
  CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
  createBigCommerceEnhancer,
  GetProductsOptions,
  parameterIsBigCommerceProductQuery,
} from '@uniformdev/canvas-bigcommerce';
import { getProductById, convertCommerceModel } from '@/utils/commerce';
import { commerceClient, getBrands, getCategories, getProductsByCategories } from '@/utils/commerce';

export const bigCommerceEnhancer = createBigCommerceEnhancer({
  client: commerceClient,
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
  return new EnhancerBuilder().parameterType(
    CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
    compose(bigCommerceEnhancer, convertCommerceModel)
  );
};

export const createProductDetailEnhancers = ({ productId }: { productId: number }) => {
  return new EnhancerBuilder()
    .data('product', () => getProductById(productId))
    .data('relatedProducts', async () => {
      const product = await getProductById(productId);
      if (!product) return;
      const relatedProducts = await getProductsByCategories(product.categories);
      return relatedProducts.filter(p => p.id !== product.id);
    })
    .parameterType(
      CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
      compose(createBigCommerceContextQueryEnhancer({ productId }), compose(bigCommerceEnhancer, convertCommerceModel))
    );
};

const createBigCommerceContextQueryEnhancer = ({
  productId,
}: {
  productId: number;
}): ComponentParameterEnhancer<string | GetProductsOptions | string[], string | GetProductsOptions | string[]> => {
  return {
    enhanceOne: async options => {
      const { parameter } = options;
      let processedValue = parameter.value;
      if (parameterIsBigCommerceProductQuery(parameter)) {
        const product = await getProductById(productId);
        if (!product) return;
        processedValue = {
          ...parameter.value,
          brand: product?.brandId?.toString() || undefined,
        };
      }
      return processedValue;
    },
  };
};

export const createCategoriesBrandsEnhancers = () => {
  return new EnhancerBuilder().data('categories', getCategories).data('brands', getBrands);
};
