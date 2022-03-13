import React from 'react';
import { Story, Meta } from '@storybook/react';
import HeroImageRight from '.';
import { HeroProps } from '@/components/Hero/HeroProps';

export default {
  title: 'Content/HeroImageRight',
  component: HeroImageRight,
  argTypes: {},
} as Meta;

const Template: Story<HeroProps> = args => <HeroImageRight {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: 'Hero Title goes here',
  subtitle: 'and a subtitle to support the message',
  backgroundImage:
    'https://images.unsplash.com/photo-1583404629797-1330dd79dbfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
};
