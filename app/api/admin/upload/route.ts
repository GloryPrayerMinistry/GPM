import { NextResponse } from 'next/server';
import { requireAdmin } from '@/app/lib/auth';
import { storeUploadedImage, UploadError } from '@/app/lib/storage';

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const url = await storeUploadedImage(file);

    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Upload failed:', error);
    return NextResponse.json(
      {
        error:
          process.env.BLOB_READ_WRITE_TOKEN
            ? 'Upload failed. Please try again.'
            : 'Upload failed. For production, set BLOB_READ_WRITE_TOKEN on Vercel.',
      },
      { status: 500 }
    );
  }
}
