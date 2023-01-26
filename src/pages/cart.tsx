import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { getTopNavCategoryLinks } from '@/utils/commerce';
import Navbar from '@/components/Navigation/Header';
import Footer from '@/components/Navigation/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import { NavLinkProp } from '@/components/atoms/NavLink';

const ShoppingCartPage: NextPage<{
  topNavCategoryLinks: Array<NavLinkProp>;
}> = ({ topNavCategoryLinks }) => (
  <>
    <Navbar topNavCategoryLinks={topNavCategoryLinks} />
    <ShoppingCart />
    <Footer />
  </>
);

export const getStaticProps: GetStaticProps<{
  topNavCategoryLinks: Array<NavLinkProp>;
}> = async () => ({
  props: {
    topNavCategoryLinks: (await getTopNavCategoryLinks()) as Array<NavLinkProp>,
  },
});

export default ShoppingCartPage;
