import * as React from 'react';
import '@/styles/globals.scss';
import 'tailwindcss/tailwind.css';
import * as nextImage from 'next/image';

export const decorators = [
  (Story: any) => (
    <div className="body_container grid columns-12 gap-16">
      <Story />
    </div>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props: any) => {
    return <img {...props} />;
  },
});
