import React from 'react';
import { Story, Meta } from '@storybook/react';
import RelatedProducts, { RelatedProductsProps } from '.';
import products from '@/utils/moks/products';

export default {
  title: 'Commerce/RelatedProducts',
  component: RelatedProducts,
  argTypes: {},
} as Meta;

const Template: Story<RelatedProductsProps> = args => <RelatedProducts {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'For your kitchen',
  relatedProducts: products,
};
