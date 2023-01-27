import { RootComponentInstance } from '@uniformdev/canvas';
import PreviewSwitch from './PreviewSwitch/PreviewSwitch';

function PreviewEnabler({ preview }: { preview?: boolean; composition: RootComponentInstance }) {
  return preview ? <PreviewSwitch previewing={preview} /> : null;
}

export default PreviewEnabler;
