import React from 'react';
import { Slot } from '@uniformdev/canvas-react';

type LatestStoriesProps = {
  title: string;
};

const LatestStories = ({ title }: LatestStoriesProps) => (
  <div className="bg-wild_sand lg:pt-24 pt-12 lg:pb-36 pb-8">
    <p className="font-overpass font-extrabold text-black lg:text-4xl text-2xl text-center">{title}</p>
    <div className="flex flex-col lg:flex-row justify-center pt-8 lg:pt-24 px-5">
      <Slot name="story" />
    </div>
  </div>
);

export default LatestStories;
