import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

export interface SvgInlineProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}
const getImageUrlWithSizes = (src: string): string => (src.startsWith('//') ? src.replace('//', 'https://') : src);
const ImageLoader = ({ src, width, height }: any) =>
  `${src}?${width ? `w=${width}` : ''}${height ? `${width ? '&' : ''}h=${height}` : ''}`;

const SvgInline: React.FC<SvgInlineProps> = ({
  src,
  height = undefined,
  width = undefined,
  className = '',
  alt = '',
}) => {
  if (!src) return null;

  return (
    <Image
      src={getImageUrlWithSizes(src)}
      width={width}
      height={height}
      className={classNames('w-full h-full fill-white', className)}
      alt={alt || 'icon'}
      layout={width && height ? 'fixed' : 'fill'}
      objectFit="contain"
      loader={src?.startsWith('/img/') ? ImageLoader : undefined}
    />
  );
};

export default SvgInline;
