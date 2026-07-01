import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const flyers = await prisma.flyer.findMany({ orderBy: { updatedAt: 'desc' } });
    return NextResponse.json(flyers);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const flyer = await prisma.flyer.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        linkUrl: body.linkUrl || null,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(flyer, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create flyer' }, { status: 400 });
  }
}
