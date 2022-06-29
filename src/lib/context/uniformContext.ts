import { NextPageContext } from 'next';
import { Context, ManifestV2, enableContextDevTools, enableDebugConsoleLogDrain } from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';
import manifest from './manifest.json';

export function createUniformContext(serverContext?: NextPageContext) {
  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: [enableContextDevTools(), enableDebugConsoleLogDrain('debug')],
  });
  return context;
}
