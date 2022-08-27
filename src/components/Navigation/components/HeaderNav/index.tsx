import React, { Fragment } from 'react';
import { Slot } from '@uniformdev/canvas-react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import NavLink from '@/atoms/NavLink';

const HeaderNav = () => (
  <div className="flex lg:flex-row flex-col lg:items-center justify-center lg:pl-12 pb-10 lg:pb-0">
    <Slot name="navLinks" />
  </div>
);

export const TopNavLink = ({ link, linkTitle, component }: { link: string; linkTitle: string; component: any }) =>
  component?.slots?.subnavItems ? (
    <div className="top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
            ${open ? '' : 'text-opacity-70'}
            group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>{linkTitle}</span>
              {open ? (
                <ChevronUpIcon
                  className={`${open ? '' : 'text-opacity-70'}
                ml-2 h-5 w-5 text-black-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70'}
              ml-2 h-5 w-5 text-black-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <SubnavItems
                    subnavItems={component.slots?.subnavItems.filter((c: any) => c.type === 'navigationItem')}
                  />
                  <NavPromos navPromos={component.slots?.subnavItems.filter((c: any) => c.type === 'promo')} />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  ) : (
    <div className="top-16 w-full max-w-sm px-4">
      <NavLink
        href={link}
        title={linkTitle}
        className="text-opacity-70 group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      />
    </div>
  );

const NavPromos = ({ navPromos }: any) =>
  navPromos
    .filter((i: any) => i)
    .map((item: any, index: number) => (
      <div key={index} className="bg-gray-50 p-4">
        <NavPromo {...item.parameters} />
      </div>
    ));

const NavPromo = ({ link, title, text }: any) =>
  link?.value ? (
    <a
      href={link?.value}
      className="-m-3 flex items-center rounded-lg p-6 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
        <PromoIcon aria-hidden="true" />
      </div>
      <div className="ml-4">
        <span className="flex items-center">
          <span className="text-sm font-medium text-gray-900">{title.value}</span>
        </span>
        <span className="block text-sm text-gray-500">{text.value}</span>
      </div>
    </a>
  ) : (
    <div className="-m-3 flex items-center rounded-lg p-6 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
        <PromoIcon aria-hidden="true" />
      </div>
      <div className="ml-4">
        <span className="flex items-center">
          <span className="text-sm font-medium text-gray-900">{title.value}</span>
        </span>
        <span className="block text-sm text-gray-500">{text.value}</span>
      </div>
    </div>
  );

const SubnavItems = ({ subnavItems }: any) => (
  <div className={`relative grid gap-8 bg-white p-7 lg:grid-cols-${subnavItems.length <= 2 ? 2 : 3}`}>
    {subnavItems.map((item: any, index: number) => (
      <div key={index}>
        <h2 className="text-xl">{item?.parameters?.linkTitle.value}</h2>
        <ul>
          {item.slots.subnavItems.map((subitem: any, index: number) => (
            <li key={index}>
              <h3 className="text-l">
                <NavLink
                  href={subitem?.parameters?.link.value}
                  title={subitem?.parameters?.linkTitle.value}
                  className="underline text-opacity-70 group inline-flex items-center rounded-md py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                />
              </h3>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

function PromoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path d="M113 153H28c-13.785 0-25-11.215-25-25V78c0-13.785 11.215-25 25-25h85v100zM28 63c-8.271 0-15 6.729-15 15v50c0 8.271 6.729 15 15 15h75V63H28z" />
      <path fill="#4ab6ff" d="m198 188-90-40V58l90-40z" />
      <path d="m203 195.693-100-44.444V54.751l100-44.444v185.386zm-90-50.942 80 35.556V25.693l-80 35.556v83.502zM68 243H48c-8.271 0-15-6.729-15-15v-65h50v65c0 8.271-6.729 15-15 15zm-25-70v55c0 2.757 2.243 5 5 5h20c2.757 0 5-2.243 5-5v-55H43zM218 98h30v10h-30zM214.463 136.536l7.07-7.07 20 19.999-7.07 7.07zM214.463 69.466l20-20 7.07 7.07-20 20zM38 98h40v10H38z" />
      <path d="M114.938 203H73v-40h28.604l13.334 40zM83 193h18.062l-6.666-20H83v20z" />
    </svg>
  );
}

export default HeaderNav;
