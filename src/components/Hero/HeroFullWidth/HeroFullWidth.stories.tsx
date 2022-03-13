import React from 'react';
import { Story, Meta } from '@storybook/react';
import HeroFullWidth from '.';
import { HeroProps } from '@/components/Hero/HeroProps';

export default {
  title: 'Content/HeroFullWidth',
  component: HeroFullWidth,
  argTypes: {},
} as Meta;

const Template: Story<HeroProps> = args => <HeroFullWidth {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: 'Cool Publications Products',
  subtitle: 'some catchy subtitle for Publications',
  backgroundImage:
    'https://images.unsplash.com/photo-1583404629797-1330dd79dbfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
};
