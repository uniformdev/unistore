import React from 'react';
import { CallToActionProps } from '../CallToActionProps';
import LinkButton from '@/components/atoms/LinkButton';

const CallToActionBasic = ({ title, text, callToActionTitle, callToActionLink }: CallToActionProps) => (
  <div className="md:w-5/6 m-auto pt-16 pb-16">
    {title && (
      <p className="font-overpass md:text-center font-extrabold text-3xl leading-6 text-orange_border mb-6">{title}</p>
    )}
    {text && <p className="font-overpass md:text-center font-bold text-xl leading-7 text-black mt-2">{text}</p>}
    {callToActionTitle && callToActionLink && (
      <LinkButton text={callToActionTitle} href={callToActionLink} className="mt-8 px-4" />
    )}
  </div>
);

export default CallToActionBasic;
