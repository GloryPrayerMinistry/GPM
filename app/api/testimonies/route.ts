import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
  const testimonies = await prisma.testimony.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(testimonies);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const testimony = await prisma.testimony.create({
      data: {
        title: body.title.trim(),
        content: body.content.trim(),
        authorName: body.authorName?.trim() || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json(testimony, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit testimony' }, { status: 400 });
  }
}
