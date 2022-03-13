import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useCompositionEventEffect, UseCompositionEventEffectOptions } from '@uniformdev/canvas-react';

type UseLivePreviewNextStaticPropsOptions = Omit<UseCompositionEventEffectOptions, 'effect' | 'enabled'>;

function useLivePreviewNextStaticProps(options: UseLivePreviewNextStaticPropsOptions) {
  const router = useRouter();

  const effect = useCallback(() => {
    console.log('🥽 Preview updated.');
    router.replace(router.asPath, undefined, { scroll: false });
  }, [router]);

  return useCompositionEventEffect({
    ...options,
    enabled: router.isPreview,
    effect,
  });
}

export default useLivePreviewNextStaticProps;
