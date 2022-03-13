import React from 'react';
import Image from 'next/image';

export type FeatureItemProps = {
  text: string;
  icon: string;
};

const FeatureItem = ({ text, icon }: FeatureItemProps) => (
  <div className="md:w-6/12 md:pl-8 pb-12">
    {icon && <Image src={icon} width={91} height={72} />}
    <div className="w-24 h-1 bg-cornflower mt-2 mb-4" />
    <p className="font-overpass">{text}</p>
  </div>
);

export default FeatureItem;
