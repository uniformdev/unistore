import {
  CanvasClient,
  CANVAS_PUBLISHED_STATE,
  CANVAS_DRAFT_STATE,
  enhance,
  RootComponentInstance,
} from '@uniformdev/canvas';
import getConfig from 'next/config';
import { defaultEnhancers, productDetailEnhancers, categoryEnhancers } from '@/lib/enhancers';

const {
  serverRuntimeConfig: { apiKey, apiHost, projectId },
} = getConfig();

export const canvasClient = new CanvasClient({
  apiKey: apiKey,
  apiHost: apiHost,
  projectId: projectId,
});

export async function getCompositionBySlug(slug: string, context: any) {
  const { preview } = context || {};
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: slug,
    state: getState(preview),
  });

  await enhance({
    composition,
    context,
    enhancers: defaultEnhancers,
  });

  return composition;
}

export async function getProductDetailComposition(productId: string, context: any) {
  const { preview } = context || {};
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: 'product-detail',
    state: getState(preview),
    skipEnhance: false,
  });

  await enhance({
    composition,
    enhancers: productDetailEnhancers({ productId }),
    context,
  });
  return composition;
}

export async function getCategoryComposition(categoryId: string, context: any) {
  const { preview } = context || {};
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: 'product-category',
    state: getState(preview),
    skipEnhance: false,
  });

  await enhance({
    composition,
    enhancers: categoryEnhancers({ categoryId }),
    context: {},
  });
  return composition;
}

export const getState = (preview: boolean | undefined) =>
  process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;

export const getCompositionPaths = async () => {
  const pages = await canvasClient.getCompositionList({
    skipEnhance: true,
    state: getState(undefined),
  });

  return pages.compositions
    .filter(c => c.composition._slug && c.composition._slug !== '/')
    .map(c => (c.composition._slug?.startsWith('/') ? `${c.composition._slug}` : `/${c.composition._slug}`));
};

// export async function getCompositionsForNavigation(preview: boolean) {
//   const response = await canvasClient.getCompositionList({
//     skipEnhance: true,
//     state: process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
//   });
//   return response.compositions
//     .filter(c => c.composition._slug)
//     .map(c => {
//       return {
//         title: c.composition._name,
//         url: c.composition._slug,
//       };
//     });
// }
