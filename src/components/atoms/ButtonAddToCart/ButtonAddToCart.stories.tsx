import React from 'react';
import { Story, Meta } from '@storybook/react';
import ButtonAddToCart, { ButtonAddToCartProps } from '.';
import { ActionButtonProps } from '@/atoms/ActionButton';

export default {
  title: 'Atoms/ButtonAddToCart',
  component: ButtonAddToCart,
  argTypes: {},
} as Meta;

const Template: Story<ActionButtonProps & ButtonAddToCartProps> = args => <ButtonAddToCart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  quantity: 1,
  product: {
    id: 0,
    name: 'test',
    type: 'digital',
    weight: 0,
    price: 0,
  },
};
