import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    if (!body.title?.trim() || !body.category?.trim() || !body.text?.trim()) {
      return NextResponse.json(
        { error: 'Title, category, and prayer text are required.' },
        { status: 400 }
      );
    }

    const prayer = await prisma.prayer.update({
      where: { id },
      data: {
        title: body.title.trim(),
        category: body.category.trim(),
        description: body.description?.trim() || '',
        scripture: body.scripture?.trim() || '',
        text: body.text.trim(),
        isActive: body.isActive ?? true,
        isPinned: body.isPinned ?? false,
        sortOrder: typeof body.sortOrder === 'number' ? body.sortOrder : 0,
      },
    });

    return NextResponse.json(prayer);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.prayer.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}
