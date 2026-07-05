import { put } from '@vercel/blob';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 5 * 1024 * 1024;

export class UploadError extends Error {
  constructor(
    message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'UploadError';
  }
}

export function validateImageFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new UploadError('Invalid file type. Use JPEG, PNG, WebP, or GIF.');
  }
  if (file.size > MAX_BYTES) {
    throw new UploadError('File too large. Maximum size is 5MB.');
  }
}

function buildFilename(originalName: string) {
  const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  return `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
}

async function storeLocally(file: File, filename: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

async function storeOnBlob(file: File, filename: string): Promise<string> {
  const blob = await put(`uploads/${filename}`, file, {
    access: 'public',
    addRandomSuffix: false,
  });
  return blob.url;
}

/**
 * Persists an uploaded image. Uses Vercel Blob in production when
 * BLOB_READ_WRITE_TOKEN is set; otherwise writes to public/uploads (local dev).
 */
export async function storeUploadedImage(file: File): Promise<string> {
  validateImageFile(file);

  const filename = buildFilename(file.name);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return storeOnBlob(file, filename);
  }

  return storeLocally(file, filename);
}
