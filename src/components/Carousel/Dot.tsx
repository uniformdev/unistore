import React from 'react';

type DotProps = {
  active?: boolean;
  onClick?: () => void;
};

const Dot = ({ active, onClick }: DotProps) => (
  <button
    aria-label="carousel-dot"
    type="button"
    onClick={onClick}
    className={`${
      active ? 'bg-ebony_clay' : 'bg-demo_border'
    } flex justify-center w-[62px] h-[6px] sm:mx-[13px] mx-[6px]`}
  />
);

export default Dot;
