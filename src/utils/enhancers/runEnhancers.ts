// import getConfig from 'next/config';
import { compose, enhance, EnhancerBuilder, RootComponentInstance } from '@uniformdev/canvas';
import { CANVAS_BIGCOMMERCE_PARAMETER_TYPES } from '@uniformdev/canvas-bigcommerce';
import { bigCommerceEnhancer, createCategoriesBrandsEnhancers } from '@/utils/enhancers';
// TODO: enable Contentful enhancer if you are using this headless CMS
// import { CANVAS_CONTENTFUL_PARAMETER_TYPES } from '@uniformdev/canvas-contentful';
// import { contentfulEnhancer } from './contentful/contentfulEnhancer';

export default async function runEnhancers(composition: RootComponentInstance, context: any, slug: string = '/') {
  let enhancers = new EnhancerBuilder().parameterType(CANVAS_BIGCOMMERCE_PARAMETER_TYPES, bigCommerceEnhancer);

  // TODO: enable Contentful enhancer if you are using this headless CMS
  // const { serverRuntimeConfig } = getConfig();
  // const { contentfulSpaceId, contentfulDeliveryToken, contentfulEnvironment } = serverRuntimeConfig;
  // const contentfulConfigured: boolean =
  //   contentfulSpaceId !== undefined && contentfulDeliveryToken !== undefined && contentfulEnvironment !== undefined;
  // if (contentfulConfigured) {
  //   console.log('Registered Contentful Enhancer');
  //   enhancers.parameterType(CANVAS_CONTENTFUL_PARAMETER_TYPES, compose(contentfulEnhancer()));
  // }

  if (slug === 'product-category') {
    enhancers = createCategoriesBrandsEnhancers();
  }

  await enhance({
    composition,
    context,
    enhancers,
  });
}
