import { get } from '@vercel/blob';
import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const UPLOADS_PREFIX = 'uploads/';

function contentTypeForPath(pathname: string): string {
  const ext = pathname.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;
  const pathname = segments.join('/');

  if (!pathname || pathname.includes('..') || !pathname.startsWith(UPLOADS_PREFIX)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (isBlobConfigured()) {
    try {
      const ifNoneMatch = request.headers.get('if-none-match') ?? undefined;
      const result = await get(pathname, {
        access: 'private',
        ifNoneMatch,
      });

      if (!result) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      if (result.statusCode === 304) {
        return new NextResponse(null, {
          status: 304,
          headers: result.blob.etag ? { ETag: result.blob.etag } : undefined,
        });
      }

      const headers = new Headers();
      headers.set(
        'Content-Type',
        result.blob.contentType || contentTypeForPath(pathname)
      );
      if (result.blob.etag) {
        headers.set('ETag', result.blob.etag);
      }
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');

      return new NextResponse(result.stream, { headers });
    } catch (error) {
      console.error('Blob media fetch failed:', error);
      return NextResponse.json({ error: 'Failed to load media' }, { status: 500 });
    }
  }

  try {
    const filePath = path.join(process.cwd(), 'public', pathname);
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentTypeForPath(pathname),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
