import React from 'react';
import LinkButton from '@/components/atoms/LinkButton';
import { CallToActionProps } from '../CallToActionProps';

const CallToActionMini = ({ title, text, callToActionTitle, callToActionLink }: CallToActionProps) => (
  <>
    {title && <p className="font-bold text-4xl">{title}</p>}
    {text && <p className="mt-6" dangerouslySetInnerHTML={{ __html: text }} />}
    <br />
    {callToActionTitle && callToActionLink && (
      <LinkButton href={callToActionLink} text={callToActionTitle} className="mt-8 px-4" />
    )}
  </>
);

export default CallToActionMini;
