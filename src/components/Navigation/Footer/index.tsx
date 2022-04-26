import React from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import { ToggleEmbeddedContextDevTools } from '@uniformdev/context-devtools';
import FooterLogo, { LogoPosition } from '@/components/Navigation/components/Logo';
import FooterNav from '../components/FooterNav';

const { serverRuntimeConfig } = getConfig();
const { projectId, apiKey, apiHost } = serverRuntimeConfig;

const Footer = () => (
  <footer className="bg-black dark:bg-gray-800 border-t  dark:border-zinc-600">
    <div className="header_footer_container flex lg:flex-row flex-col lg:items-center justify-center lg:justify-between place-content-between w-full py-16">
      <div className="flex lg:flex-row flex-col items-center">
        <div className="w-48 lg:pb-0 pb-8">
          <FooterLogo contentPosition={LogoPosition.footer} />
        </div>
        <FooterNav />
      </div>
      <div className="flex flex-row justify-center lg:pb-0 pb-2">
        <a className="rounded-full bg-white w-8 h-8 mx-2 flex items-center justify-center" href="https://facebook.com">
          <Image src="/img/social/facebook.svg" alt="Facebook" height={16} width={16} />
        </a>
        <a className="rounded-full bg-white w-8 h-8 mx-2 flex items-center justify-center" href="https://twitter.com">
          <Image src="/img/social/twitter.svg" alt="Twitter" height={16} width={16} />
        </a>
        <a className="rounded-full bg-white w-8 h-8 mx-2 flex items-center justify-center" href="https://instagram.com">
          <Image src="/img/social/instagram.svg" alt="Instagram" height={16} width={16} />
        </a>
        <a className="rounded-full bg-white w-8 h-8 mx-2 flex items-center justify-center" href="https://vimeo.com">
          <Image src="/img/social/vimeo.svg" alt="Vimeo" height={16} width={16} />
        </a>
      </div>
    </div>
    <ToggleEmbeddedContextDevTools
      initialSettings={{
        apiHost,
        apiKey,
        projectId,
      }}
    />
  </footer>
);

export default Footer;
