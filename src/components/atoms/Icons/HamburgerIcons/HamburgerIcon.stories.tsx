import React from 'react';
import { Story, Meta } from '@storybook/react';
import HamburgerIcon from '.';

export default {
  title: 'Atoms/Icons/HamburgerIcons',
  component: HamburgerIcon,
  argTypes: {},
} as Meta;

const Template: Story = () => <HamburgerIcon />;

export const Primary = Template.bind({});
