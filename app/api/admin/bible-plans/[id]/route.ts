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

    const plan = await prisma.biblePlan.update({
      where: { id },
      data: {
        type: body.type.toUpperCase(),
        periodKey: body.periodKey,
        title: body.title || null,
        imageUrl: body.imageUrl,
        description: body.description || null,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(plan);
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
    await prisma.biblePlan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}
