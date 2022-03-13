import React from 'react';
import { Story, Meta } from '@storybook/react';
import LinkButton, { LinkButtonProps } from '.';

export default {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  argTypes: {},
} as Meta;

const Template: Story<LinkButtonProps> = args => <LinkButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  href: '#',
  text: 'Primary',
};
