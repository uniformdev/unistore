import { Transition } from 'react-transition-group';
import React from 'react';

const AnimatedTransition = ({ children, animation, timeout, ...rest }: any) => (
  <Transition timeout={timeout} {...rest}>
    {state => (
      <div
        style={{
          animationDelay: `${state === 'exiting' ? timeout?.exit : timeout?.enter}ms`,
          // animationDuration: `${state === 'exiting' ? duration?.exit : duration?.enter}ms`,
        }}
        className={`animated ${state === 'exiting' ? animation.exit : animation.enter}`}
      >
        {children}
      </div>
    )}
  </Transition>
);

export default AnimatedTransition;
