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

    const devotional = await prisma.dailyDevotional.update({
      where: { id },
      data: {
        date: body.date,
        dailyFocusImage: body.dailyFocusImage,
        dailyFocus: body.dailyFocus,
        dailyDeclarationImage: body.dailyDeclarationImage,
        verseText: body.verseText,
        verseReference: body.verseReference,
      },
    });

    return NextResponse.json(devotional);
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
    await prisma.dailyDevotional.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}
