import useLivePreviewNextStaticProps from '../useLivePreviewNextStaticProps';
import getConfig from 'next/config';
import PreviewSwitch from './PreviewSwitch/PreviewSwitch';
import { RootComponentInstance } from '@uniformdev/canvas';

function PreviewEnabler({ preview, composition }: { preview?: boolean; composition: RootComponentInstance }) {
  const {
    publicRuntimeConfig: { projectId },
  } = getConfig();

  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: projectId,
  });

  return preview ? <PreviewSwitch previewing={preview} /> : null;
}

export default PreviewEnabler;
