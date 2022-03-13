import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProductImageGallery, { ProductImageGalleryProps } from '.';
import product from '@/utils/moks/product';

export default {
  title: 'Commerce/ProductImageGallery',
  component: ProductImageGallery,
  argTypes: {},
} as Meta;

const Template: Story<ProductImageGalleryProps> = args => <ProductImageGallery {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  product,
};
