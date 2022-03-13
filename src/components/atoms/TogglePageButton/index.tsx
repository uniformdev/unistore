import Image from 'next/image';
import React from 'react';

export enum ArrowPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

type Props = {
  onChange(): void;
  text: string;
  imgSrc: string;
  className?: string;
  positionArrow?: ArrowPosition;
};

const TogglePageButton: React.FC<Props> = ({
  onChange,
  text,
  imgSrc,
  className,
  positionArrow = ArrowPosition.LEFT,
}) => (
  <div className="flex justify-center items-center">
    <button
      onClick={onChange}
      className={`${className} group items-center  flex transition hover:bg-azure_radiance bg-endeavour text-xs md:text-base dark:text-white w-full  h-full rounded dark:hover:text-havelock_blue hover:text-havelock_blue`}
    >
      {positionArrow === ArrowPosition.LEFT && <ImageArrow imgSrc={imgSrc} translate="group-hover:-translate-x-1" />}
      <span className="px-5">{text}</span>
      {positionArrow === ArrowPosition.RIGHT && <ImageArrow imgSrc={imgSrc} translate="group-hover:translate-x-1" />}
    </button>
  </div>
);

const ImageArrow = ({ imgSrc, translate }: { imgSrc: string; translate: string }) => (
  <div
    className={`h-6 m-0 block transition transform
                ${translate} motion-reduce:transition-none motion-reduce:transform-none`}
  >
    <Image width={30} height={20} className="flex justify-center items-center" src={imgSrc} />
  </div>
);

export default TogglePageButton;
