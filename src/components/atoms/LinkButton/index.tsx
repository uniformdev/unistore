import React from 'react';
import Link from 'next/link';

export type LinkButtonProps = {
  href: string;
  text: string;
  rel?: string;
  target?: string;
  disabled?: boolean;
};

const LinkButton = ({
  href,
  text,
  target = '_blank',
  rel = 'noopener noreferrer',
  disabled,
  className,
}: React.HTMLProps<HTMLButtonElement> & LinkButtonProps) =>
  href && href.startsWith('http') ? (
    <a
      href={href}
      target={target}
      className={`flex items-center justify-center h-12 border-4 ${
        disabled ? 'border-demo_border' : 'border-havelock_blue'
      } text-black font-bold text-lg leading-8 font-overpass cursor-pointer ${className}`}
      rel={rel}
    >
      {text}
    </a>
  ) : (
    <Link href={href}>
      <a
        className={`flex dark:text-white items-center justify-center h-12 border-4 ${
          disabled ? 'border-demo_border' : 'border-havelock_blue'
        } text-black font-bold text-lg leading-8 font-overpass cursor-pointer ${className}`}
      >
        {text}
      </a>
    </Link>
  );

export default LinkButton;
