import React from 'react';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Dot from '@/components/Carousel/Dot';

type CarouselProps = {
  children: JSX.Element[];
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1080 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1080, min: 568 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 568, min: 0 },
    items: 1,
  },
};

const Carousel = ({ children }: CarouselProps) => (
  <MultiCarousel ssr className="h-[36rem]" showDots customDot={<Dot />} responsive={responsive} arrows={false}>
    {children}
  </MultiCarousel>
);

export default Carousel;
