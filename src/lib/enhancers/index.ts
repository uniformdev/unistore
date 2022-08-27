import { compose, EnhancerBuilder } from '@uniformdev/canvas';

// import {
//   CANVAS_CONTENTFUL_PARAMETER_TYPES,
//   CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
//   CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
// } from "@uniformdev/canvas-contentful";
// import { contentfulEnhancer } from "./contentful/contentfulEnhancer";
// import { contentfulMultiEnhancer } from "./contentful/contentfulMultiEnhancer";
// import { contentfulQueryEnhancer } from "./contentful/contentfulQueryEnhancer";
// import { contentfulModelConverter } from "./contentful/contentfulModelConverter";
// import { STRAPI_PARAMETER_TYPES } from "@uniformdev/canvas-strapi";
// import { strapiEnhancer } from "./strapi/strapiEnhancer";
// import { strapiModelConverter } from "./strapi/strapiModelConverter";

import { sfccEnhancer } from './sfcc/sfccEnhancer';
import { sfccModelConverter, transformProduct } from './sfcc/sfccModelConverter';
import { SALESFORCE_COMMERCE_CLOUD_PARAMETER_TYPES } from '@uniformdev/canvas-salesforce-commerce-cloud';
import { getProduct, getProductsByCategory } from '@/lib/sfcc';

// const contentfulConfigured: boolean =
//   process.env.CONTENTFUL_SPACE_ID !== undefined &&
//   process.env.CONTENTFUL_ENVIRONMENT !== undefined &&
//   process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN !== undefined &&
//   process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN !== undefined;

// console.warn(
//   contentfulConfigured
//     ? '✅  Contentful enhancer is configured and enabled.'
//     : "⚠️   Contentful enhancer is not configured and therefore disabled. If that's unexpected, please check your env vars."
// );

// const strapiConfigured: boolean =
//   process.env.STRAPI_API_HOST !== undefined && process.env.STRAPI_API_TOKEN !== undefined;

//   console.warn(
//     strapiConfigured
//       ? '✅  Strapi is configured and enabled.'
//       : "⚠️  Strapi enhancer is not configured and therefore disabled. If that's unexpected, please check your env vars."
//   );

const sfccConfigured: boolean =
  process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_ID !== undefined &&
  process.env.SALESFORCE_COMMERCE_CLOUD_CLIENT_SECRET !== undefined &&
  process.env.SALESFORCE_COMMERCE_CLOUD_ORG_ID !== undefined &&
  process.env.SALESFORCE_COMMERCE_CLOUD_SHORT_CODE !== undefined &&
  process.env.SALESFORCE_COMMERCE_CLOUD_SITE_ID !== undefined;
console.warn(
  sfccConfigured
    ? '✅  Salesforce Commerce Cloud enhancer is configured and enabled.'
    : "⚠️  Salesforce Commerce Cloud enhancer is not configured and therefore disabled. If that's unexpected, please check your env vars."
);

const nullEnhancer = () => {
  console.log('WARN: null enhancer called');
};

export const defaultEnhancers = new EnhancerBuilder()
  //.parameterType(
  //   CANVAS_CONTENTFUL_PARAMETER_TYPES,
  //   contentfulConfigured ? compose(contentfulEnhancer(), contentfulModelConverter) : nullEnhancer
  // )
  // .parameterType(
  //   CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
  //   contentfulConfigured ? compose(contentfulMultiEnhancer(), contentfulModelConverter) : nullEnhancer
  // )
  // .parameterType(
  //   CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
  //   contentfulConfigured ? compose(contentfulQueryEnhancer(), contentfulModelConverter) : nullEnhancer
  // )
  .parameterType(
    SALESFORCE_COMMERCE_CLOUD_PARAMETER_TYPES,
    sfccConfigured ? compose(sfccEnhancer(), sfccModelConverter) : nullEnhancer
  );
// .parameterType(
//   STRAPI_PARAMETER_TYPES,
//   strapiConfigured ? compose(strapiEnhancer(), strapiModelConverter) : nullEnhancer
// );

export const productDetailEnhancers = ({ productId }: { productId: string }) => {
  return new EnhancerBuilder()
    .parameterType(
      SALESFORCE_COMMERCE_CLOUD_PARAMETER_TYPES,
      sfccConfigured ? compose(sfccEnhancer(), sfccModelConverter) : nullEnhancer
    )
    .parameterType(
      'salesforce-cc-prd-comp-signal',
      compose(async value => {
        const enabled = value?.parameter?.value?.value === true;
        return enabled ? await getProduct(productId) : undefined;
      }, sfccModelConverter)
    );
};

export const categoryEnhancers = ({ categoryId }: { categoryId: string }) => {
  return new EnhancerBuilder().parameterName('currentCategoryProducts', async p => {
    const limit = p.parameter.value as string;
    const products = (await getProductsByCategory(categoryId, Number.parseInt(limit)))?.map(p => transformProduct(p));
    return products;
  });
};
