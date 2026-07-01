import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const devotionals = await prisma.dailyDevotional.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(devotionals);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const devotional = await prisma.dailyDevotional.create({
      data: {
        date: body.date,
        dailyFocusImage: body.dailyFocusImage,
        dailyFocus: body.dailyFocus,
        dailyDeclaration: body.dailyDeclaration,
        verseText: body.verseText,
        verseReference: body.verseReference,
      },
    });

    return NextResponse.json(devotional, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes('Unique constraint')
        ? 'A devotional already exists for this date'
        : 'Failed to create devotional';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
