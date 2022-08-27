import React from 'react';
import NavLink, { NavLinkProp } from '@/atoms/NavLink';
import { Slot } from '@uniformdev/canvas-react';

export type HeaderContentProps = {
  categoryLinks: Array<NavLinkProp>;
};

const HeaderNav = ({ categoryLinks }: HeaderContentProps) => (
  <div className="flex lg:flex-row flex-col lg:items-center justify-center lg:pl-5 pb-10 lg:pb-0">
    <Slot name="navLinks" />
  </div>
);

export const TopNavLink = ({ link, linkTitle }: { link: string; linkTitle: string }) => (
  <NavLink
    href={link}
    title={linkTitle}
    className="header_footer_container--header_items text-black dark:text-white lg:m-0 m-3"
  />
);

export default HeaderNav;
