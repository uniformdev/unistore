import { ComponentProps } from '@uniformdev/canvas-react';

export type CallToActionProps = ComponentProps<{
  title: string;
  text: string;
  callToActionTitle?: string;
  callToActionLink?: string;
}>;
