import React from 'react';
import CurrentRouteField from '@/components/atoms/CurrentRouteField';

const HiddenInput = ({ formName }: { formName: string | ReadonlyArray<string> | number | undefined }) => (
  <>
    <input type="hidden" name="form-name" value={formName} />
    <CurrentRouteField />
    <p className="hidden">
      <span>
        Don't fill this out if you're human:
        <input name="bot-field" />
      </span>
    </p>
  </>
);

export default HiddenInput;
