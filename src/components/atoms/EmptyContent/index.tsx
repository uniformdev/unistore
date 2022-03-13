import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  imageLink?: string;
  text?: string;
  isLoad?: boolean;
}

const EmptyContent: React.FC<Props> = ({ title, imageLink = '', text = '', isLoad = false }) => (
  <div className="pt-14 dark:text-white lg:mb-28 font-overpass not-italic text-black flex flex-col justify-center items-center h-full">
    {!isLoad && (
      <>
        <div className="mt-7 font-bold text-3xl">{title}</div>
        {imageLink && (
          <div className="mt-7">
            <Image src={imageLink} alt="Wislist" width={76} height={75} layout="fixed" />
          </div>
        )}
        {title && <div className="mt-7">{text}</div>}
      </>
    )}
  </div>
);

export default EmptyContent;
