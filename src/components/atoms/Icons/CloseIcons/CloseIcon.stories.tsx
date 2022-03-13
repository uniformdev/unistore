import React from 'react';
import { Story, Meta } from '@storybook/react';
import CloseIcon from '.';

export default {
  title: 'Atoms/Icons/ButtonAddToCart',
  component: CloseIcon,
  argTypes: {},
} as Meta;

const Template: Story = () => <CloseIcon />;

export const Primary = Template.bind({});
