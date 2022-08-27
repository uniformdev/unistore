import React, { useEffect, useContext } from 'react';
import { Slot } from '@uniformdev/canvas-react';
import { useUniformContext } from '@uniformdev/context-react';
import CurrentProductContext from '@/lib/hooks/currentProduct';

const ContainerProductDetail = () => {
  const product = useContext(CurrentProductContext);
  const { primaryCategoryId } = product || {};
  const enrichments = primaryCategoryId
    ? primaryCategoryId.split('-').map((e: string) => {
        return {
          cat: 'cat',
          key: e,
          str: 5,
        };
      })
    : [];

  const { context } = useUniformContext();
  useEffect(() => {
    context.update({ enrichments });
  }, [context]);

  return (
    <div className="pb-24 flex flex-col lg:flex-row">
      <div className="flex flex-1 justify-center lg:min-w-max">
        <Slot name="left" />
      </div>
      <div className="flex justify-center">
        <Slot name="right" />
      </div>
    </div>
  );
};

export default ContainerProductDetail;
