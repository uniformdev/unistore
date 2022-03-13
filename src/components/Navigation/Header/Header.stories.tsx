import React from 'react';
import { Story, Meta } from '@storybook/react';
import Navbar from '.';
import { NavLinkProp } from '@/atoms/NavLink';

interface NavbarArgs {
  topNavCategoryLinks: Array<NavLinkProp>;
}

export default {
  title: 'Navigation/Navbar',
  component: Navbar,
  argTypes: {},
} as Meta;

const Template: Story<NavbarArgs> = args => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  topNavCategoryLinks: [
    {
      title: 'page 1',
      href: '#',
    },
    {
      title: 'page 2',
      href: '#',
    },
    {
      title: 'page 3',
      href: '#',
    },
  ],
};
