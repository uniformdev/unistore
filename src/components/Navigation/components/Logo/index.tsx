import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';
import { Themes } from '@/utils/navUtils';

type Props = {
  contentPosition?: LogoPosition;
};

export enum LogoPosition {
  header = 'header',
  footer = 'footer',
}
const NavigationLogo = ({ contentPosition }: Props) => {
  const { forcedTheme } = useTheme();
  return (
    <Link href="/" passHref>
      <div>
        <Image
          className="object-cover cursor-pointer"
          src={`/img/logo-${forcedTheme === Themes.dark ? LogoPosition.footer : contentPosition}.svg`}
          alt="Logo"
          width={232}
          height={59}
        />
      </div>
    </Link>
  );
};

NavigationLogo.defaultProps = {
  contentPosition: LogoPosition.header,
};

export default NavigationLogo;
