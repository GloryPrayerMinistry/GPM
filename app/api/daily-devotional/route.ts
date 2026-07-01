import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { toDateKey } from '@/app/lib/dates';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const dateKey = dateParam || toDateKey();

  const devotional = await prisma.dailyDevotional.findUnique({
    where: { date: dateKey },
  });

  if (!devotional) {
    return NextResponse.json({ devotional: null, date: dateKey });
  }

  return NextResponse.json({ devotional, date: dateKey });
}
