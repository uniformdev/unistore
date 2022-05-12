import { RootComponentInstance } from '@uniformdev/canvas';
import PreviewEnabler from './PreviewEnabler';

import styles from './PreviewDevPanel.module.scss';

function PreviewDevPanel({ preview, composition }: { preview?: boolean; composition: RootComponentInstance }) {
  console.log(preview ? '🥽 Preview enabled ✅' : '🥽 Preview disabled ⛔');
  return (
    <div className={styles['panel']}>
      <div className={styles['preview-switch']}>
        <PreviewEnabler preview={preview} composition={composition} />
      </div>
    </div>
  );
}

export default PreviewDevPanel;
