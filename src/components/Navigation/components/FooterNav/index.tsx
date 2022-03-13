import React from 'react';
import NavLink, { NavLinkProp } from '@/components/atoms/NavLink';

const FooterNav = () => (
  <div className="flex lg:flex-row flex-col lg:items-center justify-center lg:pl-5 pb-10 lg:pb-0">
    <FooterLink href="/" title="Home" />
    <FooterLink href="/shop/shop-all" title="Shop All" />
    <FooterLink href="/contact" title="Contact" />
  </div>
);

const FooterLink = ({ href, title }: NavLinkProp) => (
  <NavLink href={href} title={title} className="header_footer_container--footer_items text-white lg:m-0 m-3" />
);

export default FooterNav;
