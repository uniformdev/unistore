import { ComponentType } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent, ComponentProps } from '@uniformdev/canvas-react';

import LatestStories from '@/components/LatestStories';
import ProductsCarousel from '@/components/ProductsCarousel';
import FeatureItem from '@/components/FeatureItem';
import CallToActionFullWidth from '@/components/CallToActions/CallToActionFullWidth';
import CallToActionMini from '@/components/CallToActions/CallToActionMini';
import HeroFullWidth from '@/components/Hero/HeroFullWidth';
import HeroImageRight from '@/components/Hero/HeroImageRight';
import ProductCatalog from '@/components/ProductCatalog';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductDescription from './ProductDescription';
import RelatedProducts from './RelatedProducts';
import ContainerProductDetail from './containers/ContainerProductDetail';
import ContainerEqualHalf from '@/components/containers/ContainerEqualHalf';
import Container2313 from './containers/Container23-13';
import Container1323 from './containers/Container13-23';
import HeaderNav, { TopNavLink } from './Navigation/components/HeaderNav';

const componentMappings: ComponentMapping = {
  hero: HeroFullWidth,
  heroFullWidth: HeroFullWidth,
  heroImageRight: HeroImageRight,
  callToAction: CallToActionFullWidth,
  callToActionFullWidth: CallToActionFullWidth,
  callToActionMini: CallToActionMini,
  latestStories: LatestStories,
  featuredProducts: ProductsCarousel,
  dynamicProductList: ProductsCarousel,
  productRecommendations: ProductsCarousel,
  featureItem: FeatureItem,
  currentCategoryProductList: ProductCatalog,
  productImageGallery: ProductImageGallery,
  productInfo: ProductInfo,
  productDescription: ProductDescription,
  relatedProducts: RelatedProducts,
  container: ContainerEqualHalf,
  containerProductDetail: ContainerProductDetail,
  containerEqualHalf: ContainerEqualHalf,
  'container23-13': Container2313,
  'container13-23': Container1323,
  headerNavigation: HeaderNav,
  navigationItem: TopNavLink,
};

type ComponentMapping = Record<string, ComponentType<any>>;

export function componentResolver(component: ComponentInstance): ComponentType<ComponentProps<any>> | null {
  const { variant } = component;
  const componentName = variant ? `${component.type}${capitalizeFirstLetter(variant)}` : component.type;
  const componentImpl = componentMappings[componentName];
  if (!componentImpl) {
    return DefaultNotImplementedComponent;
  }
  return componentImpl;
}

function capitalizeFirstLetter(string: string) {
  if (!string) {
    return undefined;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default componentResolver;
