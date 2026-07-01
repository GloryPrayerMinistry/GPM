import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const plans = await prisma.biblePlan.findMany({
      where: type ? { type: type.toUpperCase() } : undefined,
      orderBy: [{ type: 'asc' }, { periodKey: 'desc' }],
    });

    return NextResponse.json(plans);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const plan = await prisma.biblePlan.create({
      data: {
        type: body.type.toUpperCase(),
        periodKey: body.periodKey,
        title: body.title || null,
        imageUrl: body.imageUrl,
        description: body.description || null,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes('Unique constraint')
        ? 'A bible plan already exists for this type and period'
        : 'Failed to create bible plan';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
