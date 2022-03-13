import React from 'react';

export const CustomRightArrow = ({ onClick, right, top }: any) => (
  <button
    onClick={event => onClick(event)}
    style={{ right: right ?? 0, top: top ?? 'auto' }}
    aria-label="Go to previous slide"
    className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
    type="button"
  />
);
export const CustomLeftArrow = ({ onClick, left, top }: any) => (
  <button
    onClick={event => onClick(event)}
    style={{ left: left ?? 0, top: top ?? 'auto' }}
    aria-label="Go to previous slide"
    className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
    type="button"
  />
);
