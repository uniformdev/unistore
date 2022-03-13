import React from 'react';
import { Story, Meta } from '@storybook/react';
import ShoppingItem, { ShoppingItemProps } from '.';

export default {
  title: 'Commerce/ShoppingItem',
  component: ShoppingItem,
  argTypes: {},
} as Meta;

const Template: Story<ShoppingItemProps> = args => <ShoppingItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  image_url:
    'https://cdn11.bigcommerce.com/s-kah20gjl9w/products/97/images/325/tieredbasket.1631213624.220.290.jpg?c=1',
  name: '[Sample] Tiered Wire Basket',
  sku: 'TWB',
  onRemove: () => undefined,
  product_id: 97,
};
