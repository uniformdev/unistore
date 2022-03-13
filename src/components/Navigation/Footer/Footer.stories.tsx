import React from 'react';
import { Story, Meta } from '@storybook/react';
import Footer from '.';

export default {
  title: 'Navigation/Footer',
  component: Footer,
  argTypes: {},
} as Meta;

const Template: Story = args => <Footer {...args} />;

export const Primary = Template.bind({});
