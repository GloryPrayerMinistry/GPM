import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { isFlyerDay } from '@/app/lib/dates';

export async function GET() {
  if (!isFlyerDay()) {
    return NextResponse.json({ flyer: null, showFlyer: false });
  }

  const flyer = await prisma.flyer.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ flyer, showFlyer: !!flyer });
}
