import React from 'react';
import { Story, Meta } from '@storybook/react';
import ActionButton, { ActionButtonProps } from '.';

export default {
  title: 'Atoms/ActionButton',
  component: ActionButton,
  argTypes: {},
} as Meta;

const Template: Story<ActionButtonProps> = args => (
  <ActionButton {...args}>
    <span>Primary</span>
  </ActionButton>
);

export const Primary = Template.bind({});
Primary.args = {
  isLoading: false,
};
