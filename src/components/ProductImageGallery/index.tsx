import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { ProductResult } from '@uniformdev/canvas-bigcommerce';
import NoImage from '../../../public/img/no-image.jpg';

export type ImageProps = { id: number; urlStandard: string };

export type ProductImageGalleryProps = {
  product?: ProductResult;
};

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const images = product?.images?.map(item => ({ id: item.id, urlStandard: item.url_standard })) as ImageProps[];
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(images[0]?.id ?? 0);
  }, [product]);

  const selectImage = (imageId: number) => () => {
    setSelectedImage(imageId);
  };

  if (!images) {
    return null;
  }

  return (
    <div>
      <div className="border-2 border-demo_border flex">
        <Image
          src={images?.find(image => image.id === selectedImage)?.urlStandard || NoImage}
          width={509}
          height={492}
        />
      </div>
      <div className="flex pt-7">
        {images.map((image, index) => (
          <button
            type="submit"
            key={`image-slide-${image.id}`}
            className={cx(
              'cursor-pointer flex w-14 h-14 sm:w-20 sm:h-20',
              selectedImage === image.id ? 'border-orange_border border-2' : 'border-2 border-demo_border',
              index === 0 ? '' : 'ml-3 sm:ml-5'
            )}
            onClick={selectImage(image.id)}
            tabIndex={0}
          >
            <Image src={image.urlStandard} width={87} height={84} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
