import { useCallback } from 'react';
import { useRouter } from 'next/router';
import next from 'next';
import { useCompositionEventEffect, UseCompositionEventEffectOptions } from '@uniformdev/canvas-react';

type UseLivePreviewNextStaticPropsOptions = Omit<UseCompositionEventEffectOptions, 'effect' | 'enabled'>;

function useLivePreviewNextStaticProps(options: UseLivePreviewNextStaticPropsOptions) {
  const router = useRouter();

  const effect = useCallback(() => {
    console.log('🥽 Preview updated.');

    // Fixes preview mode in production
    // Can be removed after https://github.com/vercel/next.js/issues/37190 is resolved
    delete (next as any).router.sdc[
      new URL(
        `/_next/data/${window.__NEXT_DATA__.buildId}${router.asPath === '/' ? '/index' : router.asPath}.json`,
        location.href
      ).toString()
    ];
    router.replace(router.asPath, undefined, { scroll: false });
  }, [router]);

  return useCompositionEventEffect({
    ...options,
    enabled: router.isPreview,
    effect,
  });
}

export default useLivePreviewNextStaticProps;
