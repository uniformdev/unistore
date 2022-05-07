import React from 'react';
import LinkButton from '@/components/atoms/LinkButton';
import { CallToActionProps } from '../CallToActionProps';

const CallToActionFullWidth = ({ title, text, callToActionTitle, callToActionLink }: CallToActionProps) => (
  <div className="md:w-5/6 m-auto pt-16 pb-16">
    {title && (
      <p className="dark:text-white font-overpass md:text-center font-extrabold text-3xl leading-6 text-orange_border mb-6 ">
        {title}
      </p>
    )}
    <p className="dark:text-white font - overpass md:text-center font-bold text-xl leading-7 text-black mt-2">{text}</p>
    {callToActionTitle && callToActionLink && (
      <div className="grid place-items-center">
        <LinkButton text={callToActionTitle} href={callToActionLink} className="mt-8 px-12" />
      </div>
    )}
  </div>
);

export default CallToActionFullWidth;
