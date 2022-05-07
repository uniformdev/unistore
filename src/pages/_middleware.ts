import { NextResponse, NextRequest } from 'next/server';
import { createEdgeContext } from '@uniformdev/context-edge';
import { createUniformEdgeMiddleware } from '@uniformdev/context-edge-vercel';
import { ManifestV2 } from '@uniformdev/context/*';

import manifest from '../lib/context/manifest.json';

const IGNORED_PATHS = /^\/.*\.(ico|png|jpg|jpeg|svg)$/g;

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware disabled in development');
    return NextResponse.next();
  }

  if (!process.env.VERCEL_URL) {
    console.error('VERCEL_URL environment is not defined');
    return new NextResponse('Configuration Error', {
      status: 500,
    });
  }

  if (request.method.toUpperCase() !== 'GET' || request.nextUrl.pathname.match(IGNORED_PATHS)) {
    return NextResponse.next();
  }

  const context = createEdgeContext({
    manifest: manifest as ManifestV2,
    request,
  });

  const edgeMiddleware = createUniformEdgeMiddleware();

  const response = await edgeMiddleware({
    context,
    origin: new URL(`https://${process.env.VERCEL_URL}`),
    request,
  });

  return new NextResponse(response.body, {
    ...response,
    headers: {
      ...response.headers,
      'Cache-Control': 'no-store, must-revalidate',
      Expires: '0',
    },
  });
}
