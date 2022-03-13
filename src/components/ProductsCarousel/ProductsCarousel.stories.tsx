import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProductsCarousel, { ProductsCarouselProps } from '.';
import products from '@/utils/moks/products';

export default {
  title: 'Commerce/ProductsCarousel',
  component: ProductsCarousel,
  argTypes: {},
} as Meta;

const Template: Story<ProductsCarouselProps> = args => <ProductsCarousel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  seeMoreTitle: 'See more kitchen products',
  seeMoreUrl: '/shop/kitchen',
  title: 'For your kitchen',
  products,
};
