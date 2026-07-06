export const MEDIA_API_PREFIX = '/api/media';

/** Build a same-origin URL that streams an uploaded file from /api/media. */
export function toMediaUrl(pathname: string): string {
  const normalized = pathname.replace(/^\/+/, '');
  return `${MEDIA_API_PREFIX}/${normalized}`;
}

/**
 * Normalize stored image URLs for display.
 * Handles legacy private blob URLs, /uploads paths, and existing proxy URLs.
 */
export function resolveMediaUrl(url: string): string {
  const trimmed = url?.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith(MEDIA_API_PREFIX)) {
    return trimmed;
  }

  if (trimmed.startsWith('/uploads/')) {
    return toMediaUrl(trimmed.slice(1));
  }

  const blobMarker = '.blob.vercel-storage.com/';
  const blobIndex = trimmed.indexOf(blobMarker);
  if (blobIndex !== -1) {
    return toMediaUrl(trimmed.slice(blobIndex + blobMarker.length));
  }

  return trimmed;
}
