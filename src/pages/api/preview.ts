import getConfig from 'next/config';
import { createPreviewHandler } from '@uniformdev/canvas-next';
import runEnhancers from '../../utils/enhancers/runEnhancers';

const handler = createPreviewHandler({
  secret: () => getConfig().serverRuntimeConfig.previewSecret,
  resolveFullPath: ({ slug }) => slug,
  enhance: async composition => runEnhancers(composition, { preview: true }),
});

export default handler;
