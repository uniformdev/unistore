import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProductInfo, { ProductInfoProps } from '.';

export default {
  title: 'Commerce/ProductInfo',
  component: ProductInfo,
  argTypes: {},
} as Meta;

const Template: Story<ProductInfoProps> = args => <ProductInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  product: {
    id: 111,
    name: '[Sample] Smith Journal 13',
    type: 'physical',
    sku: 'SM13',
    weight: 1,
    width: 0,
    depth: 0,
    height: 0,
    price: 25,
    cost_price: 0,
    retail_price: 0,
    sale_price: 0,
    map_price: 0,
    variants: [
      {
        id: 74,
        product_id: 111,
        sku: 'SM13',
        price: 25,
        calculated_price: 25,
        sale_price: 0,
        retail_price: 0,
        weight: 1,
        width: 0,
        height: 0,
      },
    ],
  },
};
