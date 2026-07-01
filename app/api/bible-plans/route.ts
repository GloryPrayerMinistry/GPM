import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { periodKeyForType, type BiblePlanType } from '@/app/lib/dates';

const VALID_TYPES = ['DAILY', 'MONTHLY', 'YEARLY'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get('type') || 'DAILY').toUpperCase();
  const period = searchParams.get('period');

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const periodKey =
    period || periodKeyForType(type as BiblePlanType);

  const plan = await prisma.biblePlan.findFirst({
    where: {
      type,
      periodKey,
      isActive: true,
    },
  });

  return NextResponse.json({ plan, type, periodKey });
}
