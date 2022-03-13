import React from 'react';
import Image from 'next/image';
import LinkButton from '../atoms/LinkButton';

export type StoryItemProps = {
  title: string;
  text: string;
  dateText: string;
  buttonText: string;
  image: string;
};

const StoryItem = ({ title, text, dateText, buttonText, image }: StoryItemProps) => (
  <div className="lg:max-w-lg md:pr-16 pt-16 lg:pt-0">
    <div className="flex flex-row">
      <div className="md:mr-24 mr-4 lg:mr-4">
        <p className="font-overpass text-sm leading-6 text-black">{dateText}</p>
        <p className="font-overpass text-2xl md:text-3xl leading-6 text-black font-bold mt-4">{title}</p>
      </div>
      <div className="flex-none relative w-[127px] h-[85px] lg:w-[198px] lg:h-[132px] before:w-full before:h-full before:absolute before:top-[11px] before:left-[11px] before:border-[6px] before:border-demo_border">
        <Image src={image} layout="fill" />
      </div>
    </div>
    <div className="pt-6">
      <p className="font-overpass">{text}</p>
      <LinkButton href="#" text={buttonText} className="mt-12 px-4" />
    </div>
  </div>
);

export default StoryItem;
