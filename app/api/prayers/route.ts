import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
  const prayers = await prisma.prayer.findMany({
    where: { isActive: true },
    orderBy: [
      { isPinned: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
      { title: 'asc' },
    ],
  });
  return NextResponse.json(prayers);
}
