import React from 'react';
import { Story, Meta } from '@storybook/react';
import CartModal from '../Cart';
import ModalRight, { ModalRightProps } from '@/components/Modals/Layouts/ModalRight';

export default {
  title: 'Modal/ModalRight',
  component: CartModal,
  argTypes: {},
} as Meta;

const Template: Story<ModalRightProps> = args => (
  <ModalRight {...args}>
    <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col" />
  </ModalRight>
);

export const Primary = Template.bind({});

Primary.args = {
  isOpen: true,
  closeModal: () => undefined,
};
