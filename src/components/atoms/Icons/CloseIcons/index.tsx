import React from 'react';

interface Props {
  fill?: string;
}

const CloseIcon = ({ fill = 'black' }: Props) => (
  <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.711426" y="26.163" width="37" height="2" rx="1" transform="rotate(-45 0.711426 26.163)" fill={fill} />
    <rect x="2.12564" y="0.162964" width="37" height="2" rx="1" transform="rotate(45 2.12564 0.162964)" fill={fill} />
  </svg>
);

export default CloseIcon;
