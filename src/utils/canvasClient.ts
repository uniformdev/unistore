import { CanvasClient, CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE, enhance, compose, EnhancerBuilder } from '@uniformdev/canvas';
import { CANVAS_BIGCOMMERCE_PARAMETER_TYPES } from '@uniformdev/canvas-bigcommerce';
import { bigCommerceEnhancer, createCategoriesBrandsEnhancers } from '@/utils/enhancers';
import getConfig from 'next/config';

import { contentstackEnhancer } from "../lib/enhancers/contentstack/contentstackEnhancer";
import { contentstackModelConverter } from "../lib/enhancers/contentstack/contentstackModelConverter";

import { CANVAS_CONTENTSTACK_PARAMETER_TYPES } from '@uniformdev/canvas-contentstack';

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
    enhancers: new EnhancerBuilder()
      .parameterType(CANVAS_BIGCOMMERCE_PARAMETER_TYPES, bigCommerceEnhancer)
      .parameterType(CANVAS_CONTENTSTACK_PARAMETER_TYPES, compose(contentstackEnhancer(), contentstackModelConverter)),
  });

  // TODO: review this approach
  if (slug === 'product-category') {
    await enhance({ composition, enhancers: createCategoriesBrandsEnhancers(), context: { preview } });
  }

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
