import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const prayers = await prisma.prayer.findMany({
      orderBy: [
        { isPinned: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
        { title: 'asc' },
      ],
    });
    return NextResponse.json(prayers);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    if (!body.title?.trim() || !body.category?.trim() || !body.text?.trim()) {
      return NextResponse.json(
        { error: 'Title, category, and prayer text are required.' },
        { status: 400 }
      );
    }

    const prayer = await prisma.prayer.create({
      data: {
        title: body.title.trim(),
        category: body.category.trim(),
        description: body.description?.trim() || '',
        scripture: body.scripture?.trim() || '',
        text: body.text.trim(),
        isActive: body.isActive ?? true,
        isPinned: body.isPinned ?? true,
        sortOrder: typeof body.sortOrder === 'number' ? body.sortOrder : 0,
      },
    });

    return NextResponse.json(prayer, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create prayer' }, { status: 400 });
  }
}
