import React from 'react';
import { Story, Meta } from '@storybook/react';
import ShoppingCart from '.';

export default {
  title: 'Commerce/ShoppingCart',
  component: ShoppingCart,
  argTypes: {},
} as Meta;

const Template: Story = args => <ShoppingCart {...args} />;

export const Primary = Template.bind({});
