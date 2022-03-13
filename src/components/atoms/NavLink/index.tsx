import React from 'react';
import Link from 'next/link';

export type NavLinkProp = {
  title: string;
  href: string;
  className?: string;
};

const NavLink = ({ href, title, className }: NavLinkProp) => (
  <Link href={href}>
    <a className={className}>{title}</a>
  </Link>
);

export default NavLink;
