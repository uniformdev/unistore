import { LinkProps } from 'next/link';
import { sluggify } from './stringUtils';

export const buildProductDetailLink = ({
  id,
  productName,
}: {
  id: number | string;
  productName: string;
}): LinkProps => {
  const slug = sluggify(productName);
  return {
    href: `/products/${id}`,
  };
};
