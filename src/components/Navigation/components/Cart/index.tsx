import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useCartContext } from '@/context/CartProvider';
import { Themes } from '@/constants';

const HeaderCart = () => {
  const { cartAmount } = useCartContext();
  const { forcedTheme } = useTheme();
  return (
    <Link href="/cart" passHref>
      <div className="flex items-center cursor-pointer">
        {cartAmount !== 0 && (
          <a className="navbar-item font-extrabold font-overpass">
            <span className="bigcommerce-cart__item-count full">{cartAmount}</span>
          </a>
        )}
        <div className="pl-2">
          <Image
            src={forcedTheme === Themes.dark ? '/img/cart_white.svg' : '/img/cart.svg'}
            alt="Cart"
            width={30}
            height={30}
            layout="fixed"
          />
        </div>
      </div>
    </Link>
  );
};

export default React.memo(HeaderCart);
