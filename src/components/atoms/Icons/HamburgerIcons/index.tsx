import React from 'react';

interface Props {
  fill?: string;
}

const HamburgerIcon = ({ fill = 'black' }: Props) => (
  <svg width="37" height="26" viewBox="0 0 37 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="37" height="2" rx="1" fill={fill} />
    <rect y="12" width="37" height="2" rx="1" fill={fill} />
    <rect y="24" width="37" height="2" rx="1" fill={fill} />
  </svg>
);

export default HamburgerIcon;
