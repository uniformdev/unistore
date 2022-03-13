import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Themes } from '@/utils/navUtils';

type DropdownProps = {
  title: string;
  isOpened: boolean;
  onClick: () => void;
  onMouseOut: (toggle: boolean) => void;
  children: JSX.Element;
};

const Dropdown = ({ title, isOpened, onClick, onMouseOut, children }: DropdownProps) => {
  const onMouseOutDropdown = () => {
    onMouseOut(false);
  };
  const { forcedTheme } = useTheme();
  return (
    <div onMouseLeave={onMouseOutDropdown} className="relative inline-block text-left">
      <div className="pr-0 pb-2">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 dark:border-neutral-200/[.20] text-lg font-extrabold"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={onClick}
        >
          {title}
          <Image
            className="-mr-1 ml-2"
            src={forcedTheme === Themes.dark ? `/img/dropdown-icon-white.svg` : `/img/dropdown-icon.svg`}
            width={24}
            height={24}
          />
        </button>
      </div>
      {isOpened && (
        <div
          className="z-50 origin-top-right absolute right-0 w-56 rounded-md shadow-lg  bg-white dark:text-black ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
