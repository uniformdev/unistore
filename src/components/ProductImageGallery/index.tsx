import React, { useState, useContext } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import CurrentProductContext from '@/lib/hooks/currentProduct';
import NoImage from '@/public/img/no-image.svg';

const ProductImageGallery = () => {
  const product = useContext(CurrentProductContext);
  if (!product) return null;
  const images: Array<any> = product.images;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  if (!images || images.length <= 0) {
    return null;
  }

  return (
    <div>
      <div className="border-2 border-demo_border flex">
        <Image src={images[selectedImageIndex]?.src || NoImage} width={509} height={492} />
      </div>
      <div className="flex pt-7">
        {images.map((image, index: number) => (
          <button
            type="submit"
            key={`image-slide-${index}`}
            className={cx(
              'cursor-pointer flex w-14 h-14 sm:w-20 sm:h-20',
              selectedImageIndex === index ? 'border-orange_border border-2' : 'border-2 border-demo_border',
              index === 0 ? '' : 'ml-3 sm:ml-5'
            )}
            onClick={() => setSelectedImageIndex(index)}
            tabIndex={0}
          >
            <Image src={image.src} width={87} height={84} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
