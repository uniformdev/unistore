import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import React, { useRef, useEffect, useContext, useMemo } from 'react';

const TransitionContext = React.createContext({ parent: {} });

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

const CSSTransition: any = ({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  className = '',
  appear,
  children,
}: any) => {
  const nodeRef = React.useRef(null);
  const enterClasses = enter.split(' ').filter((s: string) => s.length);
  const enterFromClasses: string[] = enterFrom.split(' ').filter((s: string) => s.length);
  const enterToClasses = enterTo.split(' ').filter((s: string) => s.length);
  const leaveClasses = leave.split(' ').filter((s: string) => s.length);
  const leaveFromClasses = leaveFrom.split(' ').filter((s: string) => s.length);
  const leaveToClasses = leaveTo.split(' ').filter((s: string) => s.length);

  const addClasses = (node: any, classes: string[]) => {
    if (classes.length) node.classList.add(...classes);
  };

  const removeClasses = (node: any, classes: string[]) => {
    if (classes.length) node.classList.remove(...classes);
  };

  return (
    <ReactCSSTransition
      nodeRef={nodeRef}
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={
        ((_: any, done: (this: HTMLElement, ev: TransitionEvent) => boolean) => {
          if (nodeRef.current) {
            const node: HTMLElement = nodeRef.current;
            node.addEventListener('transitionend', done, false);
          }
        }) as any
      }
      onEnter={
        (() => {
          addClasses(nodeRef.current, [...enterClasses, ...enterFromClasses]);
        }) as any
      }
      onEntering={
        (() => {
          removeClasses(nodeRef.current, enterFromClasses);
          addClasses(nodeRef.current, enterToClasses);
        }) as any
      }
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterToClasses, ...enterClasses]);
      }}
      onExit={
        (() => {
          addClasses(nodeRef.current, [...leaveClasses, ...leaveFromClasses]);
        }) as any
      }
      onExiting={
        (() => {
          removeClasses(nodeRef.current, leaveFromClasses);
          addClasses(nodeRef.current, leaveToClasses);
        }) as any
      }
      onExited={
        (() => {
          removeClasses(nodeRef.current, [...leaveToClasses, ...leaveClasses]);
        }) as any
      }
    >
      <div ref={nodeRef} className={className}>
        {children}
      </div>
    </ReactCSSTransition>
  );
};

const Transition = ({ show, appear, ...rest }: any) => {
  const { parent }: any = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  const value = useMemo(() => ({ parent: { show, isInitialRender, appear } }), [appear, isInitialRender, show]);

  if (isChild) {
    return <CSSTransition appear={parent.appear || !parent.isInitialRender} show={parent.show} {...rest} />;
  }
  return (
    <TransitionContext.Provider value={value}>
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
};

export default Transition;
