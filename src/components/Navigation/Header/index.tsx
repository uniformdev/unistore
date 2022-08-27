import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import HeaderCart from '@/components/Navigation/components/Cart';
import HeaderLogo from '@/components/Navigation/components/Logo';
import HamburgerIcon from '@/components/atoms/Icons/HamburgerIcons';
import { hiddenScroll } from '@/utils/scroll';
import CloseIcon from '@/atoms/Icons/CloseIcons';
import { Themes } from '@/utils/navUtils';
import { Slot } from '@uniformdev/canvas-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleIsOpen = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const router = useRouter();
  const handleRouteChangeStart = () => setIsOpen(false);
  const { forcedTheme } = useTheme();

  React.useEffect(() => {
    router?.events.on('routeChangeStart', handleRouteChangeStart);
    return () => router?.events.off('routeChangeStart', handleRouteChangeStart);
  }, []);

  const iconFill = useMemo(() => (forcedTheme === Themes.dark ? 'white' : 'black'), [forcedTheme]);

  React.useEffect(() => {
    if (isOpen) {
      hiddenScroll(document.body, true);
      return;
    }
    hiddenScroll(document.body, false);
  }, [isOpen]);

  return (
    <header className="relative border-b dark:border-neutral-200/[.20]">
      <div
        className="header_footer_container hidden lg:flex lg:flex-row lg:items-center lg:place-content-between lg:py-4"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="flex">
          <HeaderLogo />
          <Slot name="header" />
        </div>
        <HeaderCart />
      </div>
      <div className="w-full lg:hidden flex h-20 flex-row items-center place-content-between px-5">
        <div className="lg:max-w-full max-w-[50%]">
          <HeaderLogo />
        </div>
        <div className="flex flex-row -mr-2 -my-2 lg:hidden pl-3">
          <HeaderCart />
          <button
            type="button"
            aria-label="mobile navigation"
            className="pl-3 inline-flex w-20 w-20 items-center justify-center p-2 focus:outline-none"
            onClick={toggleIsOpen}
          >
            {isOpen ? <CloseIcon fill={iconFill} /> : <HamburgerIcon fill={iconFill} />}
          </button>
        </div>
      </div>
      <div className="lg:hidden">
        {isOpen && (
          <div className="absolute bg-white dark:bg-gray-800 flex flex-col items-center w-full header_footer_container--mobile pt-16">
            <Slot name="header" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
